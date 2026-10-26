export interface WeddingEvent {
  name: string;
  nameEn: string;
  date: string;
  time: string;
  venue?: string;
}

export interface DaySchedule {
  date: string;
  dateGu: string;
  weekday: string;
  weekdayGu: string;
  events: WeddingEvent[];
}

// Countdown target — first function of the wedding (ગણેશ સ્થાપના, 25 Nov)
export const WEDDING_DATE = '2026-11-25T08:00:00+05:30';

export const COUPLES = [
  {
    groom: 'Kishan',
    bride: 'Riya',
    groomGu: 'કિશન',
    brideGu: 'રિયા',
    groomParentsGu: 'શ્રી કીર્તિભાઈ અને શ્રીમતિ જ્યોત્સનાબેન',
    brideParentsGu: 'શ્રી બળદેવલાલ અને શ્રીમતિ વર્ષાબેન',
  },
  {
    groom: 'Parth',
    bride: 'Heena',
    groomGu: 'પાર્થ',
    brideGu: 'હિના',
    groomParentsGu: 'શ્રી રાજેન્દ્રલાલ અને શ્રીમતિ રમિલાબેન',
    brideParentsGu: 'શ્રી કીર્તિભાઈ અને શ્રીમતિ જ્યોત્સનાબેન',
    brideFirst: true,
  },
];

export const SCHEDULE: DaySchedule[] = [
  {
    date: '25 November 2026',
    dateGu: '૨૫ નવેમ્બર ૨૦૨૬',
    weekday: 'Wednesday',
    weekdayGu: 'બુધવાર',
    events: [
      { name: 'ગણેશ સ્થાપના', nameEn: 'Ganesh Sthapana', date: '25 Nov', time: '07:15 AM' },
      // { name: 'ગ્રહ શાંતિ', nameEn: 'Grah Shanti', date: '25 Nov', time: '09:30 AM' },
      // { name: 'જમણવાર', nameEn: 'Jamanvar (Lunch)', date: '25 Nov', time: '12:00 PM' },
      { name: 'મામેરું', nameEn: 'Mameru', date: '25 Nov', time: '02:00 PM' },
      { name: 'હલ્દી રસમ તથા રાસગરબા', nameEn: 'Haldi Ceremony', date: '25 Nov', time: '08:00 PM' },
    ],
  },
  {
    date: '26 November 2026',
    dateGu: '૨૬ નવેમ્બર ૨૦૨૬',
    weekday: 'Thursday',
    weekdayGu: 'ગુરુવાર',
    events: [
      { name: 'જાન પ્રસ્થાન', nameEn: "Jan Prasthan", date: '26 Nov', time: '07:30 AM' },
      { name: 'હસ્ત મેળાપ', nameEn: 'Hasta Melap', date: '26 Nov', time: '11:00 AM' },
    ],
  },
  {
    date: '28 November 2026',
    dateGu: '૨૮ નવેમ્બર ૨૦૨૬',
    weekday: 'Saturday',
    weekdayGu: 'શનિવાર',
    events: [
      { name: 'જાન આગમન', nameEn: "Jan Aagaman (Baraat)", date: '28 Nov', time: '08:00 AM' },
      { name: 'હસ્ત મેળાપ', nameEn: 'Hasta Melap', date: '28 Nov', time: '09:30 AM' },
      { name: 'ભોજન સમારંભ', nameEn: 'Banquet (Lunch)', date: '28 Nov', time: '10:30 AM' },
      { name: 'કન્યા વિદાય', nameEn: 'Kanya Viday', date: '28 Nov', time: '04:00 PM' },
    ],
  },
];
