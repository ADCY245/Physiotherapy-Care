import { Resend } from 'resend';

const JSON_HEADERS = {
  'content-type': 'application/json; charset=utf-8',
  'cache-control': 'no-store'
};
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const LIMITS = {
  fullName: 120,
  phone: 40,
  email: 254,
  date: 10,
  time: 30,
  area: 160,
  reason: 100,
  message: 2000,
  submissionId: 100
};

const requestId = () => crypto.randomUUID();

const json = (body, status = 200, correlationId = '') => {
  const headers = new Headers(JSON_HEADERS);
  if (correlationId) headers.set('x-request-id', correlationId);
  return new Response(JSON.stringify(body), { status, headers });
};

const failure = (code, message, status, correlationId) => json({
  ok: false,
  code,
  error: message,
  requestId: correlationId
}, status, correlationId);

const log = (level, event, fields = {}) => {
  const entry = JSON.stringify({ event, ...fields });
  if (level === 'error') console.error(entry);
  else console.log(entry);
};

const clean = (value, limit) => typeof value === 'string' ? value.trim().slice(0, limit) : '';

const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const isSameOrigin = (request) => {
  const origin = request.headers.get('origin');
  return !origin || origin === new URL(request.url).origin;
};

const formatConsultationType = (value) => value === 'home' ? 'Home Visit Physiotherapy' : 'On-Clinic Consultation';

const classifyProviderFailure = (providerError) => {
  const status = Number(providerError?.statusCode || providerError?.status || 0) || null;
  const providerCode = typeof providerError?.name === 'string'
    ? providerError.name.slice(0, 100)
    : typeof providerError?.code === 'string' ? providerError.code.slice(0, 100) : null;
  const providerText = `${providerCode || ''} ${providerError?.message || ''}`.toLowerCase();

  if (status === 401 || status === 403 || /unauthori[sz]ed|invalid.*key|forbidden/.test(providerText)) {
    return { code: 'EMAIL_PROVIDER_AUTH', status: 502, message: 'Enquiry service is temporarily unavailable. Please try again later.', providerStatus: status, providerCode };
  }
  if (/domain|sender|from|not verified|verify/.test(providerText)) {
    return { code: 'EMAIL_SENDER_UNVERIFIED', status: 502, message: 'Enquiry service is temporarily unavailable. Please try again later.', providerStatus: status, providerCode };
  }
  if (status === 429) {
    return { code: 'EMAIL_PROVIDER_RATE_LIMITED', status: 429, message: 'Please wait before submitting another enquiry.', providerStatus: status, providerCode };
  }
  if (status && status >= 500) {
    return { code: 'EMAIL_PROVIDER_UNAVAILABLE', status: 502, message: 'We could not send your enquiry right now. Please try again shortly.', providerStatus: status, providerCode };
  }
  return { code: 'EMAIL_PROVIDER_REJECTED', status: 502, message: 'We could not send your enquiry right now. Please try again shortly.', providerStatus: status, providerCode };
};

const renderEmail = (details) => {
  const homeArea = details.consultationType === 'home'
    ? `<tr><th>Home Visit Area</th><td>${escapeHtml(details.area)}</td></tr>`
    : '';
  return `<!doctype html>
<html lang="en">
  <body style="margin:0;background:#f5f8f7;color:#444;font-family:Arial,sans-serif;line-height:1.6">
    <div style="max-width:640px;margin:0 auto;padding:32px 18px">
      <div style="background:#ffffff;border:1px solid #dce9e6;border-radius:16px;padding:34px">
        <p style="margin:0 0 22px;color:#2faea7;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase">Physiotherapy &amp; Care</p>
        <h1 style="margin:0 0 18px;color:#3d3d3f;font-size:25px;font-weight:600">Dear ${escapeHtml(details.fullName)},</h1>
        <p>Thank you for contacting Physiotherapy &amp; Care.</p>
        <p>We have successfully received your enquiry. Thank you for considering us for your physiotherapy and rehabilitation needs.</p>
        <p>Our team will get in touch with you shortly to discuss your requirements and assist you with the next steps.</p>
        <h2 style="margin:28px 0 10px;color:#3d3d3f;font-size:16px">Your enquiry details</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr><th style="padding:9px 0;border-bottom:1px solid #e5eeee;text-align:left;color:#74807e;font-weight:600">Name</th><td style="padding:9px 0;border-bottom:1px solid #e5eeee;text-align:right">${escapeHtml(details.fullName)}</td></tr>
          <tr><th style="padding:9px 0;border-bottom:1px solid #e5eeee;text-align:left;color:#74807e;font-weight:600">Phone Number</th><td style="padding:9px 0;border-bottom:1px solid #e5eeee;text-align:right">${escapeHtml(details.phone)}</td></tr>
          <tr><th style="padding:9px 0;border-bottom:1px solid #e5eeee;text-align:left;color:#74807e;font-weight:600">Email Address</th><td style="padding:9px 0;border-bottom:1px solid #e5eeee;text-align:right">${escapeHtml(details.email)}</td></tr>
          <tr><th style="padding:9px 0;border-bottom:1px solid #e5eeee;text-align:left;color:#74807e;font-weight:600">Consultation Type</th><td style="padding:9px 0;border-bottom:1px solid #e5eeee;text-align:right">${escapeHtml(formatConsultationType(details.consultationType))}</td></tr>
          <tr><th style="padding:9px 0;border-bottom:1px solid #e5eeee;text-align:left;color:#74807e;font-weight:600">Preferred Date</th><td style="padding:9px 0;border-bottom:1px solid #e5eeee;text-align:right">${escapeHtml(details.date)}</td></tr>
          <tr><th style="padding:9px 0;border-bottom:1px solid #e5eeee;text-align:left;color:#74807e;font-weight:600">Preferred Time</th><td style="padding:9px 0;border-bottom:1px solid #e5eeee;text-align:right">${escapeHtml(details.time)}</td></tr>
          ${homeArea}
          <tr><th style="padding:9px 0;border-bottom:1px solid #e5eeee;text-align:left;color:#74807e;font-weight:600">What they would like help with</th><td style="padding:9px 0;border-bottom:1px solid #e5eeee;text-align:right">${escapeHtml(details.reason)}</td></tr>
          <tr><th style="padding:9px 0;text-align:left;color:#74807e;font-weight:600;vertical-align:top">Message</th><td style="padding:9px 0;text-align:right;white-space:pre-wrap">${escapeHtml(details.message || 'Not provided')}</td></tr>
        </table>
        <p style="margin:28px 0 0">We look forward to assisting you.</p>
        <p style="margin:24px 0 0;color:#3d3d3f">Warm regards,<br /><strong>Dr. Ronak Brahmbhatt</strong><br />Physiotherapy &amp; Care<br />physiotherapyandcare.in</p>
      </div>
    </div>
  </body>
</html>`;
};

const renderText = (details) => [
  `Dear ${details.fullName},`,
  '',
  'Thank you for contacting Physiotherapy & Care.',
  'We have successfully received your enquiry. Thank you for considering us for your physiotherapy and rehabilitation needs.',
  'Our team will get in touch with you shortly to discuss your requirements and assist you with the next steps.',
  '',
  'Your enquiry details:',
  `Name: ${details.fullName}`,
  `Phone Number: ${details.phone}`,
  `Email Address: ${details.email}`,
  `Consultation Type: ${formatConsultationType(details.consultationType)}`,
  `Preferred Date: ${details.date}`,
  `Preferred Time: ${details.time}`,
  ...(details.consultationType === 'home' ? [`Home Visit Area: ${details.area}`] : []),
  `What they would like help with: ${details.reason}`,
  `Message: ${details.message || 'Not provided'}`,
  '',
  'We look forward to assisting you.',
  '',
  'Warm regards,',
  'Dr. Ronak Brahmbhatt',
  'Physiotherapy & Care',
  'physiotherapyandcare.in'
].join('\n');

const validate = (payload) => {
  const details = {
    fullName: clean(payload.fullName, LIMITS.fullName),
    phone: clean(payload.phone, LIMITS.phone),
    email: clean(payload.email, LIMITS.email).toLowerCase(),
    consultationType: clean(payload.consultationType, 20),
    date: clean(payload.date, LIMITS.date),
    time: clean(payload.time, LIMITS.time),
    area: clean(payload.area, LIMITS.area),
    reason: clean(payload.reason, LIMITS.reason),
    message: clean(payload.message, LIMITS.message),
    submissionId: clean(payload.submissionId, LIMITS.submissionId)
  };
  const errors = [];
  if (!details.fullName) errors.push('fullName');
  if (!details.phone || !/^[0-9+()\-\s]{8,40}$/.test(details.phone)) errors.push('phone');
  if (!details.email || !EMAIL_PATTERN.test(details.email)) errors.push('email');
  if (!['home', 'clinic'].includes(details.consultationType)) errors.push('consultationType');
  if (!details.date || !DATE_PATTERN.test(details.date)) errors.push('date');
  if (!details.time) errors.push('time');
  if (details.consultationType === 'home' && !details.area) errors.push('area');
  if (!details.reason) errors.push('reason');
  if (!details.submissionId || !/^[A-Za-z0-9._:-]{8,100}$/.test(details.submissionId)) errors.push('submissionId');
  return { details, errors };
};

const handleEnquiry = async (request, env, correlationId) => {
  log('info', 'enquiry_request_received', {
    requestId: correlationId,
    method: request.method,
    resendApiKeyConfigured: Boolean(env.RESEND_API_KEY),
    fromConfigured: Boolean(env.ENQUIRY_FROM_EMAIL),
    ccConfigured: Boolean(env.ENQUIRY_CC_EMAIL),
    replyToConfigured: Boolean(env.ENQUIRY_REPLY_TO)
  });
  if (request.method !== 'POST') return failure('METHOD_NOT_ALLOWED', 'Method not allowed.', 405, correlationId);
  if (!isSameOrigin(request)) return failure('INVALID_REQUEST_ORIGIN', 'Invalid request origin.', 403, correlationId);
  if (!request.headers.get('content-type')?.toLowerCase().includes('application/json')) return failure('INVALID_REQUEST_FORMAT', 'Invalid request format.', 415, correlationId);

  let payload;
  try {
    payload = await request.json();
  } catch {
    log('info', 'enquiry_invalid_body', { requestId: correlationId, reason: 'invalid_json' });
    return failure('INVALID_FORM_DATA', 'Invalid request body.', 400, correlationId);
  }
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return failure('INVALID_FORM_DATA', 'Invalid request body.', 400, correlationId);
  if (clean(payload.website, 100)) return failure('INVALID_FORM_DATA', 'Unable to process this enquiry.', 400, correlationId);

  const { details, errors } = validate(payload);
  if (errors.length) {
    log('info', 'enquiry_validation_failed', { requestId: correlationId, fields: errors });
    return failure('INVALID_FORM_DATA', 'Please complete the required enquiry fields.', 400, correlationId);
  }

  if (env.ENQUIRY_RATE_LIMITER) {
    try {
      const { success } = await env.ENQUIRY_RATE_LIMITER.limit({ key: `email:${details.email}` });
      if (!success) {
        log('info', 'enquiry_rate_limited', { requestId: correlationId });
        return failure('RATE_LIMITED', 'Please wait before submitting another enquiry.', 429, correlationId);
      }
    } catch {
      log('error', 'enquiry_rate_limiter_failed', { requestId: correlationId });
      return failure('RATE_LIMITER_UNAVAILABLE', 'Please try again shortly.', 503, correlationId);
    }
  }

  if (!env.RESEND_API_KEY || !env.ENQUIRY_FROM_EMAIL || !env.ENQUIRY_CC_EMAIL || !env.ENQUIRY_REPLY_TO) {
    log('error', 'enquiry_configuration_missing', { requestId: correlationId });
    return failure('EMAIL_CONFIGURATION_MISSING', 'Enquiry service is temporarily unavailable. Please try again later.', 503, correlationId);
  }

  try {
    const resend = new Resend(env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: env.ENQUIRY_FROM_EMAIL,
      to: [details.email],
      cc: [env.ENQUIRY_CC_EMAIL],
      replyTo: [env.ENQUIRY_REPLY_TO],
      subject: 'Enquiry',
      html: renderEmail(details),
      text: renderText(details)
    }, { idempotencyKey: `physiotherapy-enquiry:${details.submissionId}` });

    if (error || !data?.id) {
      const providerFailure = classifyProviderFailure(error || {});
      log('error', 'resend_enquiry_rejected', {
        requestId: correlationId,
        providerStatus: providerFailure.providerStatus,
        providerCode: providerFailure.providerCode,
        code: providerFailure.code
      });
      return failure(providerFailure.code, providerFailure.message, providerFailure.status, correlationId);
    }
    log('info', 'resend_enquiry_accepted', { requestId: correlationId });
    return json({ ok: true, id: data.id, requestId: correlationId }, 200, correlationId);
  } catch (providerError) {
    const providerFailure = classifyProviderFailure(providerError);
    log('error', 'resend_enquiry_exception', {
      requestId: correlationId,
      providerStatus: providerFailure.providerStatus,
      providerCode: providerFailure.providerCode,
      code: providerFailure.code
    });
    return failure(providerFailure.code, providerFailure.message, providerFailure.status, correlationId);
  }
};

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    const correlationId = requestId();
    if (pathname === '/api/enquiry') return handleEnquiry(request, env, correlationId);
    if (pathname === '/api/health') return json({ ok: true, requestId: correlationId }, 200, correlationId);
    return env.ASSETS.fetch(request);
  }
};
