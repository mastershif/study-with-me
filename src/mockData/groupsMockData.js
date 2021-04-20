
const Groups = [
    {
        id: 1,
        groupTitle: 'למידה למבחן בקורס אלגוריתמים',
        groupDescription: 'נפתור במהלך המפגש את מבחן תש"פ סמסטר א מועד א. אם יישאר זמן אז גם נדון על הטעויות של כל אחד ואחת ונסיק מסקנות.',
        groupPurpose: 'למידה למבחן',
        maxGroupSize: 5,
        currentGroupSize: 2,
        date: new Date(2021, 7,20),
        startHour: '09:00',
        endHour: '13:00',
        meetingType: 'פרונטלית',
        city: 'תל-אביב',
        place: 'ספריית מדעים מדויקים באוניברסיטת תל-אביב',
        link: null,
        institution: 'אוניברסיטת תל-אביב',
        people: [
            {
                id: 1,
                name: 'נעמה ניסן',
                photo: 'https://randomuser.me/api/portraits/women/94.jpg'
            },
            {
                id: 2,
                name: 'איתי לוי',
                photo: 'https://randomuser.me/api/portraits/men/14.jpg'
            },
        ]
    },
    {
        id: 2,
        groupTitle: 'מודלים חישוביים - חזרה על אוטומט מחסנית',
        groupDescription: 'נעבור שוב על המצגת מהשיעור, נדון על הנושא ונפתור מספר שאלות חזרה.',
        groupPurpose: 'חזרה על החומר',
        maxGroupSize: 8,
        currentGroupSize: 6,
        date: new Date(2021, 4,11),
        startHour: '08:00',
        endHour: '11:30',
        meetingType: 'וירטואלית',
        city: null,
        place: null,
        link: 'https://meet.google.com/',
        institution: 'אוניברסיטת בן-גוריון',
        people: [
            {
                id: 1,
                name: 'יואב בן חיים',
                photo: 'https://randomuser.me/api/portraits/men/37.jpg'
            },
            {
                id: 2,
                name: 'שירה כהן',
                photo: 'https://randomuser.me/api/portraits/women/63.jpg'
            },
            {
                id: 3,
                name: 'נעמה ניסן',
                photo: 'https://randomuser.me/api/portraits/women/94.jpg'
            },
            {
                id: 4,
                name: 'איתי לוי',
                photo: 'https://randomuser.me/api/portraits/men/14.jpg'
            },
            {
                id: 5,
                name: 'ניר אברמוב',
                photo: 'https://randomuser.me/api/portraits/men/46.jpg'
            },
            {
                id: 6,
                name: 'הילה נחמיאס',
                photo: 'https://randomuser.me/api/portraits/women/68.jpg'
            },
        ]
    },
    {
        id: 3,
        groupTitle: 'מפגש שידרבן אותנו ללמוד',
        groupDescription: 'לא נלמד משהו ביחד, פשוט הפלטפורמה תעזור לנו ללמוד בזמנים מוגדרים. כמובן שהמפגש יכלול הפסקות קפה בין לבין כדי להתאוורר ולהכיר אנשים.',
        groupPurpose: 'להתרכז ביחד',
        maxGroupSize: 3,
        currentGroupSize: 1,
        date: new Date(2021, 7,20),
        startHour: '14:00',
        endHour: '18:00',
        meetingType: 'פרונטלית',
        city: 'חיפה',
        place: 'הטכניון, ספרייה ראשית',
        link: null,
        institution: 'הטכניון',
        people: [
            {
                id: 1,
                name: 'הילה נחמיאס',
                photo: 'https://randomuser.me/api/portraits/women/68.jpg'
            },
        ]
    },
    {
        id: 4,
        groupTitle: 'למידה למבחן בקורס אלגוריתמים',
        groupDescription: 'נפתור במהלך המפגש את מבחן תש"פ סמסטר א מועד א. אם יישאר זמן אז גם נדון על הטעויות של כל אחד ואחת ונסיק מסקנות.',
        groupPurpose: 'למידה למבחן',
        maxGroupSize: 5,
        currentGroupSize: 2,
        date: new Date(2021, 7,20),
        startHour: '09:00',
        endHour: '13:00',
        meetingType: 'פרונטלית',
        city: 'תל-אביב',
        place: 'ספריית מדעים מדויקים באוניברסיטת תל-אביב',
        link: null,
        institution: 'אוניברסיטת תל-אביב',
        people: [
            {
                id: 1,
                name: 'נעמה ניסן',
                photo: 'https://randomuser.me/api/portraits/women/94.jpg'
            },
            {
                id: 2,
                name: 'איתי לוי',
                photo: 'https://randomuser.me/api/portraits/men/14.jpg'
            },
        ]
    },
    {
        id: 5,
        groupTitle: 'מודלים חישוביים - חזרה על אוטומט מחסנית',
        groupDescription: 'נעבור שוב על המצגת מהשיעור, נדון על הנושא ונפתור מספר שאלות חזרה.',
        groupPurpose: 'חזרה על החומר',
        maxGroupSize: 8,
        currentGroupSize: 6,
        date: new Date(2021, 4,11),
        startHour: '08:00',
        endHour: '11:30',
        meetingType: 'וירטואלית',
        city: null,
        place: null,
        link: 'https://meet.google.com/',
        institution: 'אוניברסיטת בן-גוריון',
        people: [
            {
                id: 1,
                name: 'יואב בן חיים',
                photo: 'https://randomuser.me/api/portraits/men/37.jpg'
            },
            {
                id: 2,
                name: 'שירה כהן',
                photo: 'https://randomuser.me/api/portraits/women/63.jpg'
            },
            {
                id: 3,
                name: 'נעמה ניסן',
                photo: 'https://randomuser.me/api/portraits/women/94.jpg'
            },
            {
                id: 4,
                name: 'איתי לוי',
                photo: 'https://randomuser.me/api/portraits/men/14.jpg'
            },
            {
                id: 5,
                name: 'ניר אברמוב',
                photo: 'https://randomuser.me/api/portraits/men/46.jpg'
            },
            {
                id: 6,
                name: 'הילה נחמיאס',
                photo: 'https://randomuser.me/api/portraits/women/68.jpg'
            },
        ]
    },
    {
        id: 6,
        groupTitle: 'מפגש שידרבן אותנו ללמוד',
        groupDescription: 'לא נלמד משהו ביחד, פשוט הפלטפורמה תעזור לנו ללמוד בזמנים מוגדרים. כמובן שהמפגש יכלול הפסקות קפה בין לבין כדי להתאוורר ולהכיר אנשים.',
        groupPurpose: 'להתרכז ביחד',
        maxGroupSize: 3,
        currentGroupSize: 1,
        date: new Date(2021, 7,20),
        startHour: '14:00',
        endHour: '18:00',
        meetingType: 'פרונטלית',
        city: 'חיפה',
        place: 'הטכניון, ספרייה ראשית',
        link: null,
        institution: 'הטכניון',
        people: [
            {
                id: 1,
                name: 'הילה נחמיאס',
                photo: 'https://randomuser.me/api/portraits/women/68.jpg'
            },
        ]
    },
    {
        id: 7,
        groupTitle: 'למידה למבחן בקורס אלגוריתמים',
        groupDescription: 'נפתור במהלך המפגש את מבחן תש"פ סמסטר א מועד א. אם יישאר זמן אז גם נדון על הטעויות של כל אחד ואחת ונסיק מסקנות.',
        groupPurpose: 'למידה למבחן',
        maxGroupSize: 5,
        currentGroupSize: 2,
        date: new Date(2021, 7,20),
        startHour: '09:00',
        endHour: '13:00',
        meetingType: 'פרונטלית',
        city: 'תל-אביב',
        place: 'ספריית מדעים מדויקים באוניברסיטת תל-אביב',
        link: null,
        institution: 'אוניברסיטת תל-אביב',
        people: [
            {
                id: 1,
                name: 'נעמה ניסן',
                photo: 'https://randomuser.me/api/portraits/women/94.jpg'
            },
            {
                id: 2,
                name: 'איתי לוי',
                photo: 'https://randomuser.me/api/portraits/men/14.jpg'
            },
        ]
    },
    {
        id: 8,
        groupTitle: 'מודלים חישוביים - חזרה על אוטומט מחסנית',
        groupDescription: 'נעבור שוב על המצגת מהשיעור, נדון על הנושא ונפתור מספר שאלות חזרה.',
        groupPurpose: 'חזרה על החומר',
        maxGroupSize: 8,
        currentGroupSize: 6,
        date: new Date(2021, 4,11),
        startHour: '08:00',
        endHour: '11:30',
        meetingType: 'וירטואלית',
        city: null,
        place: null,
        link: 'https://meet.google.com/',
        institution: 'אוניברסיטת בן-גוריון',
        people: [
            {
                id: 1,
                name: 'יואב בן חיים',
                photo: 'https://randomuser.me/api/portraits/men/37.jpg'
            },
            {
                id: 2,
                name: 'שירה כהן',
                photo: 'https://randomuser.me/api/portraits/women/63.jpg'
            },
            {
                id: 3,
                name: 'נעמה ניסן',
                photo: 'https://randomuser.me/api/portraits/women/94.jpg'
            },
            {
                id: 4,
                name: 'איתי לוי',
                photo: 'https://randomuser.me/api/portraits/men/14.jpg'
            },
            {
                id: 5,
                name: 'ניר אברמוב',
                photo: 'https://randomuser.me/api/portraits/men/46.jpg'
            },
            {
                id: 6,
                name: 'הילה נחמיאס',
                photo: 'https://randomuser.me/api/portraits/women/68.jpg'
            },
        ]
    },
    {
        id: 9,
        groupTitle: 'מפגש שידרבן אותנו ללמוד',
        groupDescription: 'לא נלמד משהו ביחד, פשוט הפלטפורמה תעזור לנו ללמוד בזמנים מוגדרים. כמובן שהמפגש יכלול הפסקות קפה בין לבין כדי להתאוורר ולהכיר אנשים.',
        groupPurpose: 'להתרכז ביחד',
        maxGroupSize: 3,
        currentGroupSize: 1,
        date: new Date(2021, 7,20),
        startHour: '14:00',
        endHour: '18:00',
        meetingType: 'פרונטלית',
        city: 'חיפה',
        place: 'הטכניון, ספרייה ראשית',
        link: null,
        institution: 'הטכניון',
        people: [
            {
                id: 1,
                name: 'הילה נחמיאס',
                photo: 'https://randomuser.me/api/portraits/women/68.jpg'
            },
        ]
    },
    {
        id: 10,
        groupTitle: 'למידה למבחן בקורס אלגוריתמים',
        groupDescription: 'נפתור במהלך המפגש את מבחן תש"פ סמסטר א מועד א. אם יישאר זמן אז גם נדון על הטעויות של כל אחד ואחת ונסיק מסקנות.',
        groupPurpose: 'למידה למבחן',
        maxGroupSize: 5,
        currentGroupSize: 2,
        date: new Date(2021, 7,20),
        startHour: '09:00',
        endHour: '13:00',
        meetingType: 'פרונטלית',
        city: 'תל-אביב',
        place: 'ספריית מדעים מדויקים באוניברסיטת תל-אביב',
        link: null,
        institution: 'אוניברסיטת תל-אביב',
        people: [
            {
                id: 1,
                name: 'נעמה ניסן',
                photo: 'https://randomuser.me/api/portraits/women/94.jpg'
            },
            {
                id: 2,
                name: 'איתי לוי',
                photo: 'https://randomuser.me/api/portraits/men/14.jpg'
            },
        ]
    },
    {
        id: 11,
        groupTitle: 'מודלים חישוביים - חזרה על אוטומט מחסנית',
        groupDescription: 'נעבור שוב על המצגת מהשיעור, נדון על הנושא ונפתור מספר שאלות חזרה.',
        groupPurpose: 'חזרה על החומר',
        maxGroupSize: 8,
        currentGroupSize: 6,
        date: new Date(2021, 4,11),
        startHour: '08:00',
        endHour: '11:30',
        meetingType: 'וירטואלית',
        city: null,
        place: null,
        link: 'https://meet.google.com/',
        institution: 'אוניברסיטת בן-גוריון',
        people: [
            {
                id: 1,
                name: 'יואב בן חיים',
                photo: 'https://randomuser.me/api/portraits/men/37.jpg'
            },
            {
                id: 2,
                name: 'שירה כהן',
                photo: 'https://randomuser.me/api/portraits/women/63.jpg'
            },
            {
                id: 3,
                name: 'נעמה ניסן',
                photo: 'https://randomuser.me/api/portraits/women/94.jpg'
            },
            {
                id: 4,
                name: 'איתי לוי',
                photo: 'https://randomuser.me/api/portraits/men/14.jpg'
            },
            {
                id: 5,
                name: 'ניר אברמוב',
                photo: 'https://randomuser.me/api/portraits/men/46.jpg'
            },
            {
                id: 6,
                name: 'הילה נחמיאס',
                photo: 'https://randomuser.me/api/portraits/women/68.jpg'
            },
        ]
    },
    {
        id: 12,
        groupTitle: 'מפגש שידרבן אותנו ללמוד',
        groupDescription: 'לא נלמד משהו ביחד, פשוט הפלטפורמה תעזור לנו ללמוד בזמנים מוגדרים. כמובן שהמפגש יכלול הפסקות קפה בין לבין כדי להתאוורר ולהכיר אנשים.',
        groupPurpose: 'להתרכז ביחד',
        maxGroupSize: 3,
        currentGroupSize: 1,
        date: new Date(2021, 7,20),
        startHour: '14:00',
        endHour: '18:00',
        meetingType: 'פרונטלית',
        city: 'חיפה',
        place: 'הטכניון, ספרייה ראשית',
        link: null,
        institution: 'הטכניון',
        people: [
            {
                id: 1,
                name: 'הילה נחמיאס',
                photo: 'https://randomuser.me/api/portraits/women/68.jpg'
            },
        ]
    },
    {
        id: 13,
        groupTitle: 'למידה למבחן בקורס אלגוריתמים',
        groupDescription: 'נפתור במהלך המפגש את מבחן תש"פ סמסטר א מועד א. אם יישאר זמן אז גם נדון על הטעויות של כל אחד ואחת ונסיק מסקנות.',
        groupPurpose: 'למידה למבחן',
        maxGroupSize: 5,
        currentGroupSize: 2,
        date: new Date(2021, 7,20),
        startHour: '09:00',
        endHour: '13:00',
        meetingType: 'פרונטלית',
        city: 'תל-אביב',
        place: 'ספריית מדעים מדויקים באוניברסיטת תל-אביב',
        link: null,
        institution: 'אוניברסיטת תל-אביב',
        people: [
            {
                id: 1,
                name: 'נעמה ניסן',
                photo: 'https://randomuser.me/api/portraits/women/94.jpg'
            },
            {
                id: 2,
                name: 'איתי לוי',
                photo: 'https://randomuser.me/api/portraits/men/14.jpg'
            },
        ]
    },
    {
        id: 14,
        groupTitle: 'מודלים חישוביים - חזרה על אוטומט מחסנית',
        groupDescription: 'נעבור שוב על המצגת מהשיעור, נדון על הנושא ונפתור מספר שאלות חזרה.',
        groupPurpose: 'חזרה על החומר',
        maxGroupSize: 8,
        currentGroupSize: 6,
        date: new Date(2021, 4,11),
        startHour: '08:00',
        endHour: '11:30',
        meetingType: 'וירטואלית',
        city: null,
        place: null,
        link: 'https://meet.google.com/',
        institution: 'אוניברסיטת בן-גוריון',
        people: [
            {
                id: 1,
                name: 'יואב בן חיים',
                photo: 'https://randomuser.me/api/portraits/men/37.jpg'
            },
            {
                id: 2,
                name: 'שירה כהן',
                photo: 'https://randomuser.me/api/portraits/women/63.jpg'
            },
            {
                id: 3,
                name: 'נעמה ניסן',
                photo: 'https://randomuser.me/api/portraits/women/94.jpg'
            },
            {
                id: 4,
                name: 'איתי לוי',
                photo: 'https://randomuser.me/api/portraits/men/14.jpg'
            },
            {
                id: 5,
                name: 'ניר אברמוב',
                photo: 'https://randomuser.me/api/portraits/men/46.jpg'
            },
            {
                id: 6,
                name: 'הילה נחמיאס',
                photo: 'https://randomuser.me/api/portraits/women/68.jpg'
            },
        ]
    },
    {
        id: 15,
        groupTitle: 'מפגש שידרבן אותנו ללמוד',
        groupDescription: 'לא נלמד משהו ביחד, פשוט הפלטפורמה תעזור לנו ללמוד בזמנים מוגדרים. כמובן שהמפגש יכלול הפסקות קפה בין לבין כדי להתאוורר ולהכיר אנשים.',
        groupPurpose: 'להתרכז ביחד',
        maxGroupSize: 3,
        currentGroupSize: 1,
        date: new Date(2021, 7,20),
        startHour: '14:00',
        endHour: '18:00',
        meetingType: 'פרונטלית',
        city: 'חיפה',
        place: 'הטכניון, ספרייה ראשית',
        link: null,
        institution: 'הטכניון',
        people: [
            {
                id: 1,
                name: 'הילה נחמיאס',
                photo: 'https://randomuser.me/api/portraits/women/68.jpg'
            },
        ]
    },
    {
        id: 16,
        groupTitle: 'למידה למבחן בקורס אלגוריתמים',
        groupDescription: 'נפתור במהלך המפגש את מבחן תש"פ סמסטר א מועד א. אם יישאר זמן אז גם נדון על הטעויות של כל אחד ואחת ונסיק מסקנות.',
        groupPurpose: 'למידה למבחן',
        maxGroupSize: 5,
        currentGroupSize: 2,
        date: new Date(2021, 7,20),
        startHour: '09:00',
        endHour: '13:00',
        meetingType: 'פרונטלית',
        city: 'תל-אביב',
        place: 'ספריית מדעים מדויקים באוניברסיטת תל-אביב',
        link: null,
        institution: 'אוניברסיטת תל-אביב',
        people: [
            {
                id: 1,
                name: 'נעמה ניסן',
                photo: 'https://randomuser.me/api/portraits/women/94.jpg'
            },
            {
                id: 2,
                name: 'איתי לוי',
                photo: 'https://randomuser.me/api/portraits/men/14.jpg'
            },
        ]
    },
    {
        id: 17,
        groupTitle: 'מודלים חישוביים - חזרה על אוטומט מחסנית',
        groupDescription: 'נעבור שוב על המצגת מהשיעור, נדון על הנושא ונפתור מספר שאלות חזרה.',
        groupPurpose: 'חזרה על החומר',
        maxGroupSize: 8,
        currentGroupSize: 6,
        date: new Date(2021, 4,11),
        startHour: '08:00',
        endHour: '11:30',
        meetingType: 'וירטואלית',
        city: null,
        place: null,
        link: 'https://meet.google.com/',
        institution: 'אוניברסיטת בן-גוריון',
        people: [
            {
                id: 1,
                name: 'יואב בן חיים',
                photo: 'https://randomuser.me/api/portraits/men/37.jpg'
            },
            {
                id: 2,
                name: 'שירה כהן',
                photo: 'https://randomuser.me/api/portraits/women/63.jpg'
            },
            {
                id: 3,
                name: 'נעמה ניסן',
                photo: 'https://randomuser.me/api/portraits/women/94.jpg'
            },
            {
                id: 4,
                name: 'איתי לוי',
                photo: 'https://randomuser.me/api/portraits/men/14.jpg'
            },
            {
                id: 5,
                name: 'ניר אברמוב',
                photo: 'https://randomuser.me/api/portraits/men/46.jpg'
            },
            {
                id: 6,
                name: 'הילה נחמיאס',
                photo: 'https://randomuser.me/api/portraits/women/68.jpg'
            },
        ]
    },
    {
        id: 18,
        groupTitle: 'מפגש שידרבן אותנו ללמוד',
        groupDescription: 'לא נלמד משהו ביחד, פשוט הפלטפורמה תעזור לנו ללמוד בזמנים מוגדרים. כמובן שהמפגש יכלול הפסקות קפה בין לבין כדי להתאוורר ולהכיר אנשים.',
        groupPurpose: 'להתרכז ביחד',
        maxGroupSize: 3,
        currentGroupSize: 1,
        date: new Date(2021, 7,20),
        startHour: '14:00',
        endHour: '18:00',
        meetingType: 'פרונטלית',
        city: 'חיפה',
        place: 'הטכניון, ספרייה ראשית',
        link: null,
        institution: 'הטכניון',
        people: [
            {
                id: 1,
                name: 'הילה נחמיאס',
                photo: 'https://randomuser.me/api/portraits/women/68.jpg'
            },
        ]
    },
    {
        id: 19,
        groupTitle: 'למידה למבחן בקורס אלגוריתמים',
        groupDescription: 'נפתור במהלך המפגש את מבחן תש"פ סמסטר א מועד א. אם יישאר זמן אז גם נדון על הטעויות של כל אחד ואחת ונסיק מסקנות.',
        groupPurpose: 'למידה למבחן',
        maxGroupSize: 5,
        currentGroupSize: 2,
        date: new Date(2021, 7,20),
        startHour: '09:00',
        endHour: '13:00',
        meetingType: 'פרונטלית',
        city: 'תל-אביב',
        place: 'ספריית מדעים מדויקים באוניברסיטת תל-אביב',
        link: null,
        institution: 'אוניברסיטת תל-אביב',
        people: [
            {
                id: 1,
                name: 'נעמה ניסן',
                photo: 'https://randomuser.me/api/portraits/women/94.jpg'
            },
            {
                id: 2,
                name: 'איתי לוי',
                photo: 'https://randomuser.me/api/portraits/men/14.jpg'
            },
        ]
    },
    {
        id: 20,
        groupTitle: 'מודלים חישוביים - חזרה על אוטומט מחסנית',
        groupDescription: 'נעבור שוב על המצגת מהשיעור, נדון על הנושא ונפתור מספר שאלות חזרה.',
        groupPurpose: 'חזרה על החומר',
        maxGroupSize: 8,
        currentGroupSize: 6,
        date: new Date(2021, 4,11),
        startHour: '08:00',
        endHour: '11:30',
        meetingType: 'וירטואלית',
        city: null,
        place: null,
        link: 'https://meet.google.com/',
        institution: 'אוניברסיטת בן-גוריון',
        people: [
            {
                id: 1,
                name: 'יואב בן חיים',
                photo: 'https://randomuser.me/api/portraits/men/37.jpg'
            },
            {
                id: 2,
                name: 'שירה כהן',
                photo: 'https://randomuser.me/api/portraits/women/63.jpg'
            },
            {
                id: 3,
                name: 'נעמה ניסן',
                photo: 'https://randomuser.me/api/portraits/women/94.jpg'
            },
            {
                id: 4,
                name: 'איתי לוי',
                photo: 'https://randomuser.me/api/portraits/men/14.jpg'
            },
            {
                id: 5,
                name: 'ניר אברמוב',
                photo: 'https://randomuser.me/api/portraits/men/46.jpg'
            },
            {
                id: 6,
                name: 'הילה נחמיאס',
                photo: 'https://randomuser.me/api/portraits/women/68.jpg'
            },
        ]
    },
    {
        id: 21,
        groupTitle: 'מפגש שידרבן אותנו ללמוד',
        groupDescription: 'לא נלמד משהו ביחד, פשוט הפלטפורמה תעזור לנו ללמוד בזמנים מוגדרים. כמובן שהמפגש יכלול הפסקות קפה בין לבין כדי להתאוורר ולהכיר אנשים.',
        groupPurpose: 'להתרכז ביחד',
        maxGroupSize: 3,
        currentGroupSize: 1,
        date: new Date(2021, 7,20),
        startHour: '14:00',
        endHour: '18:00',
        meetingType: 'פרונטלית',
        city: 'חיפה',
        place: 'הטכניון, ספרייה ראשית',
        link: null,
        institution: 'הטכניון',
        people: [
            {
                id: 1,
                name: 'הילה נחמיאס',
                photo: 'https://randomuser.me/api/portraits/women/68.jpg'
            },
        ]
    },
];

export default Groups;
