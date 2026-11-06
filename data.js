export const practice = {
  name: 'Physiotherapy & Care',
  practitioner: 'Dr. Ronak Brahmbhatt',
  credentials: 'BPT · Cert. MDT · LSCCS · MIAP',
  serviceModel: 'Home visits and on-clinic consultations by appointment.',
  phone: '+91 8591 259 330',
  phoneHref: '+918591259330',
  email: 'drronak@physiotherapyandcare.in',
  address: 'Goregaon (East), Mumbai – 400063',
  timings: {
    weekday: 'Monday–Saturday: By appointment',
    sunday: 'Sunday: By appointment'
  },
  socialLinks: {
    instagram: '',
    linkedin: ''
  },
  images: {
    hero: './public/images/physiotherapy/01_hero_physiotherapy.jpg',
    clinicRoom: './public/images/physiotherapy/formal-photo.jpeg',
    contactBanner: './public/images/physiotherapy/07_contact_banner.jpg',
    logo: 'https://res.cloudinary.com/utg2ybn1/image/upload/v1786821566/physiotherapy_care_logo.svg',
    headerBranding: 'https://res.cloudinary.com/utg2ybn1/image/upload/v1786821718/physiotherapy_care_header.svg',
    professionalCard: '',
    pageBackground: 'https://res.cloudinary.com/utg2ybn1/image/upload/v1786818021/9845541b-fcb9-4b6a-b80b-ddc70ad07cb2.png',
    doctorPortrait: '',
    practiceInterior: '',
    rehabilitation: ''
  }
};

export const treatments = [
  { number: '01', title: 'Back & Neck Pain', description: 'Guidance for everyday aches, recurring discomfort and movement-related back or neck concerns.', icon: 'back', image: './public/images/physiotherapy/03_musculoskeletal_treatment.jpg' },
  { number: '02', title: 'Sports Injuries', description: 'A considered return to activity after strains, sprains or other sports-related injuries.', icon: 'sport', image: './public/images/physiotherapy/04_sports_injury_rehabilitation.jpg' },
  { number: '03', title: 'Joint Pain & Stiffness', description: 'Support for improving comfortable movement around the joints that matter to you.', icon: 'joint', image: './public/images/physiotherapy/03_joint_pain_stiffness.jpg' },
  { number: '04', title: 'Post-Operative Rehabilitation', description: 'Structured rehabilitation support following surgery, shaped around your clinical guidance.', icon: 'rehab', image: './public/images/physiotherapy/05_post_surgical_rehabilitation.jpg' },
  { number: '05', title: 'Muscle & Soft Tissue Injuries', description: 'Thoughtful care to help you understand and work through soft tissue discomfort.', icon: 'muscle', image: './public/images/physiotherapy/05_muscle_soft_tissue.jpg' },
  { number: '06', title: 'Posture & Movement Problems', description: 'Understand movement habits and build practical strategies for daily life.', icon: 'posture', image: './public/images/physiotherapy/06_posture_ergonomics.jpg' },
  { number: '07', title: 'Mobility & Flexibility', description: 'Work towards more confident, comfortable movement at your own pace.', icon: 'mobility', image: './public/images/physiotherapy/07_mobility_flexibility.jpg' },
  { number: '08', title: 'Strength & Functional Rehabilitation', description: 'Build strength that connects to the activities and routines you want to return to.', icon: 'strength', image: './public/images/physiotherapy/08_strength_functional_rehab.jpg' }
];

export const conditions = ['Low Back Pain', 'Neck Pain', 'Shoulder Pain', 'Knee Pain', 'Sports Injuries', 'Muscle Strains', 'Joint Stiffness', 'Post-Surgical Rehabilitation', 'Postural Problems', 'Movement Restrictions'];

export const consultationOptions = [
  {
    value: 'home',
    label: 'Home Visit Physiotherapy',
    shortLabel: 'Home visit',
    description: 'Receive personalised physiotherapy in the comfort of your home, with treatment tailored to your environment and recovery goals.',
    icon: 'home'
  },
  {
    value: 'clinic',
    label: 'On-Clinic Consultation',
    shortLabel: 'On-clinic',
    description: 'Visit our clinic for professional assessment, personalised treatment and guided rehabilitation in a dedicated clinical setting.',
    icon: 'clinic'
  }
];

export const process = [
  { number: '01', title: 'Enquire', description: 'Tell us what you need and choose home visit or on-clinic consultation.' },
  { number: '02', title: 'Plan', description: 'Agree a suitable time and shape your first appointment around your goals.' },
  { number: '03', title: 'Treatment', description: 'Receive professional assessment, treatment and guided rehabilitation.' },
  { number: '04', title: 'Progress', description: 'Review your movement and adapt the plan as your recovery progresses.' }
];

export const reasons = [
  { number: '01', title: 'Choice of setting', description: 'Choose care at home or in a dedicated clinical setting.' },
  { number: '02', title: 'One-to-one attention', description: 'Your presentation, environment and goals shape each appointment.' },
  { number: '03', title: 'Convenient scheduling', description: 'Plan professional care around your routine and availability.' },
  { number: '04', title: 'Mobility-aware care', description: 'Home visits can help when travelling to a clinic is difficult.' },
  { number: '05', title: 'Functional rehabilitation', description: 'Build practical movement strategies for daily life.' },
  { number: '06', title: 'Professional guidance', description: 'Assessment-led physiotherapy from Dr. Ronak, wherever you are seen.' }
];

export const faqs = [
  { question: 'Do you provide home visits as well as clinic consultations?', answer: 'Yes. Physiotherapy & Care offers both scheduled home visit physiotherapy and on-clinic consultations by appointment.' },
  { question: 'How can I book an on-clinic consultation?', answer: 'Use the Book an Appointment form, select On-Clinic Consultation and share your preferred date and time. We will contact you to confirm the appointment.' },
  { question: 'Which areas are covered for home visits?', answer: 'Home visits are arranged in and around Goregaon (East), Mumbai. Share your area when enquiring so availability can be confirmed.' },
  { question: 'Do I need an appointment before visiting the clinic?', answer: 'Yes. On-clinic consultations are available by appointment, so please contact us before visiting.' },
  { question: 'What should I expect during my first physiotherapy consultation?', answer: 'Your first consultation includes a conversation about your concerns, relevant movement and function assessment, and a discussion of suitable next steps.' },
  { question: 'What should I prepare for a home visit?', answer: 'Choose a comfortable, reasonably clear space where you can move safely. Wear comfortable clothing and keep any relevant reports or referrals available.' },
  { question: 'How long does a physiotherapy session take?', answer: 'Session length can vary depending on your needs and the nature of the appointment. Please ask the practice about the expected duration when booking.' },
  { question: 'Do I need a doctor’s referral?', answer: 'Referral requirements can depend on your individual situation and existing medical advice. Contact the practice to discuss what is appropriate.' },
  { question: 'How many sessions might I need?', answer: 'This varies from person to person and depends on your condition, goals and progress. Your requirements can be reviewed as treatment progresses.' },
  { question: 'Where is Physiotherapy & Care based?', answer: 'Physiotherapy & Care is based in Goregaon (East), Mumbai – 400063. On-clinic consultations are available by appointment and home visits are arranged in nearby areas.' }
];
