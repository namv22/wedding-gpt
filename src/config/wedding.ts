export const wedding = {
  bride: 'Bích Thảo',
  groom: 'Hoàng Nam',
  eventTitle: 'Lễ Đính Hôn',
  date: '2026-12-20',
  // Set this to the confirmed ceremony time (24-hour HH:mm). Leave empty until confirmed.
  time: '',
  timeZone: 'Asia/Ho_Chi_Minh',
  language: 'vi',
  welcomeMessage: 'Trân trọng kính mời bạn đến chung vui và chứng kiến khoảnh khắc đặc biệt của chúng mình.',
  closingMessage: 'Cảm ơn bạn đã dành tình cảm và thời gian chung vui cùng gia đình chúng mình. Sự hiện diện của bạn sẽ làm ngày trọng đại này thêm trọn vẹn.',
  story: {
    enabled: false,
    heading: 'Chuyện chúng mình',
    introduction: '',
    milestones: [] as { date: string; title: string; description: string }[],
  },
  family: {
    bride: { father: 'Ngô Mạnh Tiến', mother: 'Dung', address: '65/2/1/5, Đường 20, Phường Hiệp Bình, TP Thủ Đức' },
    groom: { father: 'Vũ Tam Khôi', mother: 'Võ Kim Huệ', address: '186F/12A, Bình Thới, Phường Hoà Bình, TP. Hồ Chí Minh' },
  },
  venue: {
    name: 'Trung Tâm Yến Tiệc Và Hội Nghị Amor Resort, sảnh Lala Land',
    address: '61A Nguyễn Văn Đậu, Bình Lợi Trung, Thủ Đức, TP. Hồ Chí Minh',
    mapUrl: 'https://maps.app.goo.gl/Dj53si7MUv8VjGnq9',
    note: '',
  },
  schedule: [
    { time: '09:00', title: 'Đón khách', description: '', venue: '' },
    { time: '09:15', title: 'Lễ Đính Hôn', description: '', venue: '' },
    { time: '11:00', title: 'Tiệc cưới', description: '', venue: '' },
  ],
  rsvp: {
    deadline: '2026-11-20',
    maxGuests: 5,
    heading: 'Xác nhận tham dự',
    description: 'Sự hiện diện của bạn là niềm vui của chúng mình. Vui lòng xác nhận để gia đình chuẩn bị chu đáo hơn nhé!',
  },
  contacts: [
    // Add real contact details here, e.g. { label: 'Cô dâu', phone: '09...' }
  ] as { label: string; phone?: string; email?: string; messageUrl?: string }[],
  social: {
    title: 'Lễ Vu Quy · Bích Thảo & Hoàng Nam',
    description: 'Trân trọng kính mời bạn đến chung vui ngày 20.12.2026.',
    image: '/social-preview.jpg',
  },
} as const
