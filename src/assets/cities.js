const collator = new Intl.Collator('he');

const citiesNames = [
    'ירושלים',
    'תל אביב - יפו',
    'חיפה',
    'פתח תקווה',
    'ראשון לציון',
    'נתניה',
    'אשדוד',
    'באר שבע',
    'בני ברק',
    'חולון',
    'רמת גן',
    'אשקלון',
    'רחובות',
    'בת ים',
    'בית שמש',
    'הרצליה',
    'כפר סבא',
    'חדרה',
    'מודיעין-מכבים-רעות',
    'רעננה',
    'לוד',
    'רמלה',
    'נצרת',
    'מודיעין עילית',
    'רהט',
    'ראש העין',
    'נהריה',
    'אילת',
    'הוד השרון',
    'ביתר עילית',
    'קרית גת',
    'קרית אתא',
    'גבעתיים',
    'עפולה',
    'אום אל-פחם',
    'עכו',
    'כרמיאל',
    'יבנה',
    'רמת השרון',
    'קרית מוצקין',
    'נוף הגליל',
    'טבריה',
    'נס ציונה',
    'אלעד',
    'קרית ביאליק',
    'פרדס חנה-כרכור',
    'טייבה',
    'קרית ים',
    'נתיבות',
    'שפרעם',
    'קרית אונו',
    'מעלה אדומים',
    'דימונה',
    'צפת',
    'אור יהודה',
    'אופקים',
    'טמרה',
    'סחנין',
    'יהוד-מונוסון',
   'ערד',
    'שדרות',
    'באקה אל-גרביה',
    'מגדל העמק',
    'באר יעקב',
    'גבעת שמואל',
    'טירה',
    'גדרה',
    'טירת כרמל',
    'עראבה',
    'קרית מלאכי',
    'מבשרת ציון',
    'כפר יונה',
    'יקנעם עילית',
    'מעלות-תרשיחא',
    'זכרון יעקב',
    'נשר',
    'כפר קאסם',
    'גן יבנה',
    'קרית שמונה',
    'קלנסווה',
    'מגאר',
    'כפר כנא',
    'גני תקווה',
    'קדימה-צורן',
    'אור עקיבא',
    'שוהם',
    'חריש',
    'תל שבע',
    'בית שאן',
    'גבעת זאב',
    'ערערה',
    'אריאל',
    'כפר קרע',
    'יפיע',
    'ערערה-בנגב',
    'חורה',
    'כסיפה',
    'קרית טבעון',
    'דאלית אל-כרמל',
    'מזכרת בתיה',
    'ירכא',
    'בנימינה-גבעת עדה',
    'מגד אל-כרום',
    'מעלה עירון',
    'גסר א-זרקא',
    'אבן יהודה',
    'טורעאן',
    'תל מונד',
    'עין מאהל',
    'אזור',
    'רכסים',
    'דייר אל-אסד',
    'אפרת',
    'עספיא',
    'בית גאן',
    'ירוחם',
    'מיתר',
    'מגדל שמס',
    'שגב-שלום',
    'קרית עקרון',
    'כפר יאסיף',
    'דייר חנא',
    'דבוריה',
    'חצור הגלילית',
    'גלגוליה',
    'צור הדסה',
    'קרני שומרון',
    'כוכב יאיר',
    'עתלית',
    'כוכב יעקב',
    'אורנית',
    'עומר',
    'זרזיר',
    'קצרין',
    'אלפי מנשה',
    'אבו גוש',
    'בסמת טבעון',
    'קרית ארבע',
    'רמת ישי',
    'כפר חבד',
    'שלומי',
    'זמר',
    'פרדסיה',
    'בני עיש',
    'בית דגן',
    'להבים',
    'קרית יערים',
    'קיסריה',
    'צור יצחק',
    'חורפיש',
    'גולס',
    'כפר ורדים',
    'פקיעין',
    'שערי תקווה',
    'בית אל',
    'עיילבון',
    'גבע בנימין',
    'בת חפר',
    'בית אריה',
    'מצפה רמון',
    'סביון',
    'טלמון',
    'כפר תבור',
    'שילה',
    'קדומים',
    'כפר אדומים',
    'עמנואל',
    'יבנאל',
    'תקוע',
    'יד בנימין',
    'עלי זהב',
    'אלקנה',
    'כפר ברא',
    'עין נקובא',
    'אליכין',
    'סלמה',
    'מתן',
    'אל סייד',
    'כפר כמא',
    'גני מודיעין',
    'פסוטה',
    'אלון שבות',
    'ראש פינה',
    'עוזייר',
    'מעיליא',
    'עופרה',
    'קציר',
    'חשמונאים',
    'סולם',
    'רבבה',
    'גן נר',
    'אבטין',
    'ברכה',
    'צור משה',
    'כפר מצר',
    'גבעת ברנר',
    'נופית',
    'אחוזת ברק',
    'נווה דניאל',
    'מבוא חורון',
    'כוכב השחר',
    'אלעזר',
    'שמשית',
    'יקיר',
    'מצפה יריחו',
    'עץ אפרים',
    'צופים',
    'ניצן',
    'כפר שמריהו',
    'נוקדים',
    'נאעורה',
    'עין קנייא',
    'כפר האורנים',
    'נעלה',
    'מעגן מיכאל',
    'נוף איילון',
    'מרכז שפירא',
    'בית חשמונאי',
    'בית יצחק-שער חפר',
    'לפיד',
    'גבעת אבני',
    'תפרח',
    'הושעיה',
    'פדואל',
    'אבני חפץ',
    'גבעת אלה',
    'פסגות',
    'אבו תלול',
    'מייסר',
    'נורדיה',
    'מגדל',
    'ברקן',
    'סעוה',
    'שתולים',
    'עדי',
    'טייבה-בעמק',
    'ניין',
    'אלון מורה',
    'נען',
    'יצהר',
    'נילי',
    'ברקת',
    'כפר ויתקין',
    'אחיעזר',
    'שער אפרים',
    'צנדלה',
    'כרמי יוסף',
    'יגור',
    'אבן שמואל',
    'מעלה מכמש',
    'באר גנים',
    'מטולה',
    'מדרשת בן גוריון',
    'יסוד המעלה',
    'גשר הזיו',
    'חמאם',
    'בת עין',
    'מורשת',
    'קדרון',
    'עין ורד',
    'הר גילה',
    'טמרה',
    'מעלה אפרים',
    'חיננית',
    'עראמשה',
    'רמות השבים',
    'בית זית',
    'גילת',
    'בית אלעזרי',
    'קדר',
    'כמאנה',
    'עין שריד',
    'דולב',
    'נחושה',
    'שדה עוזיהו',
    'בני דקלים',
    'מעגלים',
    'ברוכין',
    'שעלבים',
    'עלמון',
    'בית השיטה',
    'בית חורון',
    'פוריה - נווה עובד',
    'כפר הס',
    'תמרת',
    'כפר סירקין',
    'מכמורת',
    'שפיים',
    'מאור',
    'סלעית',
    'גבעת חיים',
    'נחלים',
    'כפר ראש הנקרה',
    'מנשית זבדה',
    'יקנעם',
    'כפר תפוח',
    'כפר מנחם',
    'בני ראם',
    'נס הרים',
    'עזריקם',
    'אפיקים',
    'שדה ורבורג',
    'משמר העמק',
    'אביחיל',
    'סוסיה',
    'רמות מנשה',
    'יובלים',
    'מרחביה',
    'נהורה',
    'שבי ציון',
    'חירות',
    'עין דור',
    'אחיסמך',
    'מצליח',
    'טל-אל',
    'תל עדשים',
    'איתמר',
    'פורת',
    'חצב',
    'רשפון',
    'עצמון שגב',
    'מוצא עילית',
    'ניר צבי',
    'מבועים',
    'בני יהודה',
    'מצובה',
    'מגל',
    'שורש',
    'פוריה עילית',
    'עין ראפה',
    'גבעון החדשה',
    'ריחאניה',
    'גבעת יערים',
    'טירת יהודה',
    'באר טוביה',
    'נווה ימין',
    'הזורע',
    'נוה צוף',
    'משמר הנגב',
    'גבעות בר',
    'מנחמיה',
    'גילון',
    'כפר הראה',
    'כפר יהושע',
    'רומאנה',
    'כפר ורבורג',
    'יפעת',
    'בית אלפא',
    'ברכיה',
    'נווה ירק',
    'טל שחר',
    'בני דרור',
    'ביצרון',
    'ינון',
    'מולדת',
    'גן שמואל',
    'שומריה',
    'קשת',
    'כפר בן נון',
    'הדר עם',
    'כפר אביב',
    'כפר טרומן',
    'דורות',
    'יציץ',
    'מירב',
    'לוטם',
    'כליל',
    'תל יצחק',
    'כמון',
    'עין כרמל',
    'צובה',
    'ניר בנים',
    'בית הלל',
    'כפר מסריק',
    'עין שמר',
    'חרוצים',
    'נטעים',
    'יעד',
    'עזר',
    'רמת מגשימים',
    'הודיה',
    'חגלה',
    'מירון',
    'געתון',
    'גיניגר',
    'שחר',
    'בן עמי',
    'זרחיה',
    'כפר חנניה',
    'בקוע',
    'משמר השרון',
    'שילת',
    'חיבת ציון',
    'שדמות מחולה',
    'בית זרע',
    'יקום',
    'בית הלוי',
    'רמות מאיר',
    'אפק',
    'יזרעאל',
    'כפר חסידים א',
    'נחשולים',
    'ניצן ב',
    'מסלול',
    'שובה',
    'מרחביה',
    'נחליאל',
    'יסודות',
    'להב',
    'עמיקם',
    'כפר גלעדי',
    'שער העמקים',
    'מעלה לבונה',
    'אשדות יעקב',
    'רימונים',
    'שדמות דבורה',
    'בית קשת',
    'אומץ',
    'מעלה גלבוע',
    'אירוס',
    'יפתח',
    'אלונים',
    'רמת צבי',
    'נאות מרדכי',
    'גבעת ישעיהו',
    'דן',
    'נווה מיכאל',
    'נטע',
    'יונתן',
    'רוחמה',
    'חגי',
    'בית שערים',
    'דחי',
    'כפר מימון',
    'גבעת יואב',
    'כפר יעבץ',
    'עין צורים',
    'ארבל',
    'כפר החורש',
    'עבדון',
    'לימן',
    'עין חרוד' ,
    'גינוסר',
    'משגב דב',
    'נחלה',
    'בת הדר',
    'חוקוק',
    'לביא',
    'בית העמק',
    'כפר חיטים',
    'ניר יצחק',
    'גן חיים',
    'רתמים',
    'אלישיב',
    'כפר ידידיה',
    'ברקאי',
    'גבעת השלושה',
    'כפר סאלד',
    'בית נקופה',
    'חצבה',
    'גלאון',
    'מצפה אילן',
    'כפר דניאל',
    'יד רמבם',
    'אילון',
    'צרעה',
    'כברי',
    'ניר גלים',
    'בר יוחאי',
    'עזריה',
    'בני ציון',
    'עין השופט',
    'חוסן',
    'אלון הגליל',
    'בארי',
    'משמר דוד',
    'רמת יוחנן',
    'שדה נחמיה',
    'משמרות',
    'מזור',
    'כפר בילו',
    'מגדים',
    'אורה',
    'אודים',
    'אשתאול',
    'עין יעקב',
    'רמת השופט',
    'אלישמע',
    'עולש',
    'בצרה',
    'עין איילה',
    'כרמי צור',
    'חולדה',
    'שריד',
    'בית גמליאל',
    'בית עזרא',
    'עין הבשור',
    'כפר יחזקאל',
    'כוכב מיכאל',
    'איילת השחר',
    'נהלל',
    'מצפה אביב',
    'ירחיב',
    'צופית',
    'עשרת',
    'מצפה נטופה',
    'רשפים',
    'גאליה',
    'סתריה',
    'זיתן',
    'באר אורה',
    'רגבה',
    'חצרים',
    'בית יהושע',
    'שדה יעקב',
    'שדות ים',
    'רקפת',
    'דבירה',
    'שבי שומרון',
    'גבע כרמל',
    'כפר נטר',
    'נגבה',
    'בוסתן הגליל',
    'זכריה',
    'בחן',
    'ניצני עוז',
    'נבטים',
    'מעברות',
    'נירית',
    'הסוללים',
    'נתיב העשרה',
    'ברור חיל',
    'בארותיים',
    'זיקים',
    'כפר בלום',
    'טנא',
    'רינתיה',
    'מכחול',
    'רמת הכובש',
    'בית עריף',
    'צרופה',
    'ישרש',
    'חגור',
    'חמד',
    'אלוני אבא',
    'כפר הנגיד',
    'נווה אילן',
    'מבוא ביתר',
    'הזורעים',
    'משען',
    'אלומה',
    'אשדות יעקב',
    'נופים',
    'מסילת ציון',
    'צלפון',
    'שדי חמד',
    'ראש צורים',
    'חופית',
    'יודפת',
    'תלמי אלעזר',
    'אשחר',
    'גבעתי',
    'גנות הדר',
    'צפריה',
    'נצר סרני',
    'ערוגות',
    'ציפורי',
    'להבות חביבה',
    'אספר',
    'צורית',
    'גאולים',
    'יד חנה',
    'הגושרים',
    'אמונים',
    'געש',
    'אחיהוד',
    'בית חלקיה',
    'משמרת',
    'להבות הבשן',
    'משמר השבעה',
    'המעפיל',
    'סעד',
    'חניתה',
    'גינתון',
    'סער',
    'מזרע',
    'חנתון',
    'כפר עזה',
    'חדיד',
    'חצור-אשדוד',
    'גבעת כח',
    'עברון',
    'רביבים',
    'מגידו',
    'עין המפרץ',
    'קיבוץ גת',
    'שדה אליעזר',
    'מנוף',
    'עין החורש',
    'מעין צבי',
    'שפיר',
    'מעש',
    'בית רימון',
    'מגשימים',
    'עזריאל',
    'אור הנר',
    'שדה נחום',
    'עין חרוד',
    'רחלים',
    'שדה אליהו',
    'רבדים',
    'גן יאשיה',
    'גני טל',
    'עין אל-אסד',
    'כפר מונש',
    'קורנית',
    'בני דרום',
    'כפר שמואל',
    'טירת צבי',
    'כפר הנשיא',
    'קרית נטפים',
    'יטבתה',
    'מעלה החמישה',
    'דלתון',
    'מפלסים',
    'אמירים',
    'עלמה',
    'ביריה',
    'עמינדב',
    'חד-נס',
    'בן זכאי',
    'יסעור',
    'תלמי יחיאל',
    'מתתיהו',
    'כפר חושן',
    'בניה',
    'יגל',
    'אדרת',
    'החותרים',
    'כפר עציון',
    'העוגן',
    'ניר ישראל',
    'מעלה עמוס',
    'עתניאל',
    'תלמים',
    'אביגדור',
    'שמעה',
    'חוסנייה',
    'יד מרדכי',
    'אביעזר',
    'ניר דוד-תל עמל',
    'פתחיה',
    'גזית',
    'מושב בן שמן',
    'בני עטרות',
    'בית הגדי',
    'בית חנניה',
    'נווה זיו',
    'אליקים',
    'כפר אוריה',
    'בית נחמיה',
    'מחניים',
    'שכניה',
    'גן השומרון',
    'כפר הריף',
    'קבוצת יבנה',
    'בית לחם הגלילית',
    'עמקה',
    'יחיעם',
    'בית שקמה',
    'בית חירות',
    'לכיש',
    'פלמחים',
    'לוחמי הגיטאות',
    'חפצי-בה',
    'עין העמק',
    'בני נצרים',
    'עין יהב',
    'מדרך עוז',
    'כפר אחים',
    'משמר הירדן',
    'מרום גולן',
    'תקומה',
    'אבני איתן',
    'דגניה ב',
    'כפר קיש',
    'נווה מבטח',
    'רמת רזיאל',
    'ראס עלי',
    'גני יוחנן',
    'מגן שאול',
    'שדה אילן',
    'תלמי יפה',
    'ברעם',
    'כפר מרדכי',
    'עין הוד',
    'ניר יפה',
    'כפר זיתים',
    'משואות יצחק',
    'ניר עקיבא',
    'כרמיה',
    'ניר עציון',
    'אבן ספיר',
    'בית ניר',
    'אשלים',
    'מישר',
    'עטרת',
    'יושיביה',
    'תדהר',
    'שדה צבי',
    'מעין ברוך',
    'נחשון',
    'דגניה א',
    'כנרת',
    'בית עוזיאל',
    'נאות גולן',
    'כרמי קטיף',
    'כפר פינס',
    'בית חנן',
    'בת שלמה',
    'סנסנה',
    'שמרת',
    'שדה דוד',
    'כפר ברוך',
    'נתיב הלה',
    'כפר ביאליק',
    'חפץ חיים',
    'עין הנציב',
    'רמת דוד',
    'שניר',
    'זבדיאל',
    'בר גיורא',
    'ניר אליהו',
    'סגולה',
    'שרונה',
    'גבים',
    'עין גב',
    'מנוחה',
    'תעוז',
    'רגבים',
    'רמות',
    'שדה יואב',
    'גבעת נילי',
    'מצדות יהודה',
    'שדה משה',
    'שואבה',
    'מגן',
    'קטורה',
    'עין גדי',
    'מעון',
    'גן שלמה',
    'אור הגנוז',
    'משאבי שדה',
    'ארז',
    'יד נתן',
    'שער הגולן',
    'מעלה גמלא',
    'צוחר',
    'כרם בן זמרה',
    'משמר איילון',
    'אומן',
    'שורשים',
    'בלפוריה',
    'רווחה',
    'קדמת צבי',
    'כפר שמאי',
    'מבוא חמה',
    'ניר עם',
    'הרדוף',
    'כפר חיים',
    'אשרת',
    'אורות',
    'מעוז חיים',
    'שדה יצחק',
    'אילניה',
    'נופך',
    'שדה בוקר',
    'שושנת העמקים',
    'ניר משה',
    'ניצנים',
    'אשכולות',
    'בארות יצחק',
    'יתד',
    'אורים',
    'ספיר',
    'מרחב עם',
    'עמיעד',
    'כפר רופין',
    'מכמנים',
    'עין עירון',
    'רמות נפתלי',
    'עופר',
    'ברוש',
    'חברון',
    'כפר חרוב',
    'כרכום',
    'תל יוסף',
    'מסילות',
    'שאר ישוב',
    'רמת רחל',
    'בית מאיר',
    'מלכיה',
    'נתיב השיירה',
    'תל תאומים',
    'בת חן',
    'גבעת עוז',
    'כרמל',
    'גליל ים',
    'נצר חזני',
    'עלומים',
    'נירים',
    'בית רבן',
    'צאלים',
    'סאסא',
    'שדה ניצן',
    'תלמי בילו',
    'בית אורן',
    'אחוזם',
    'מבקיעים',
    'פקיעין חדשה',
    'זרועה',
    'מגדלים',
    'נחשונים',
    'גשר',
    'תל קציר',
    'אל-רום',
    'שדי תרומות',
    'נחל עוז',
    'אלומות',
    'גזר',
    'מחסיה',
    'אלי-עד',
    'ניר עוז',
    'גדעונה',
    'עגור',
    'קוממיות',
    'בית יוסף',
    'אביבים',
    'נווה אור',
    'גנות',
    'חבצלת השרון',
    'גבעולים',
    'עין זיוון',
    'גבולות',
    'בית גוברין',
    'נס עמים',
    'תירוש',
    'כפר המכבי',
    'אלוני הבשן',
    'צפרירים',
    'טפחות',
    'אלמגור',
    'פרזון',
    'כרמים',
    'חמדיה',
    'מחנה יפה',
    'מרגליות',
    'גורן',
    'צוריאל',
    'מגדל עוז',
    'הבונים',
    'מעגן',
    'מסד',
    'עין השלושה',
    'ראס אל-עין',
    'בית הערבה',
    'כפר גליקסון',
    'כיסופים',
    'ורד יריחו',
    'שומרה',
    'ירקונה',
    'תאשור',
    'גבעת חן',
    'קרית ענבים',
    'גיבתון',
    'בית ינאי',
    'חורשים',
    'נגוהות',
    'שדות מיכה',
    'שרשרת',
    'גרופית',
    'אפיק',
    'שיבולים',
    'ריחן',
    'זוהר',
    'גני הדר',
    'דישון',
    'גדיש',
    'כפר מלל',
    'שדי אברהם',
    'גן שורק',
    'יבול',
    'פצאל',
    'גאולי תימן',
    'אילות',
    'אבשלום',
    'קלע',
    'תלמי יוסף',
    'פוריה - כפר עבודה',
    'שעל',
    'אבן מנחם',
    'מחנה תל נוף',
    'צוקים',
    'מסדה',
    'חזון',
    'שזור',
    'צביה',
    'חרשים',
    'בית עובד',
    'משגב עם',
    'נטועה',
    'אדירים',
    'נווה שלום',
    'שתולה',
    'יהל',
    'תלמי אליהו',
    'ניצני סיני',
    'גשור',
    'אבירים',
    'גבעת שפירא',
    'צבעון',
    'כפר גדעון',
    'עין חוד',
    'משכיות',
    'צור נתן',
    'שבי דרום',
    'קדרים',
    'עמיעוז',
    'נווה ים',
    'כפר חסידים ב',
    'סמר',
    'יד השמונה',
    'כפר רות',
    'גיתה',
    'חרמש',
    'זרעית',
    'יעף',
    'מחנה טלי',
    'גת רימון',
    'מנרה',
    'נווה איתן',
    'צוקי ים',
    'מבוא מודיעים',
    'פרי גן',
    'עיינות',
    'כמהין',
    'כרם שלום',
    'גורנות הגליל',
    'משואה',
    'נתיב הגדוד',
    'מיצר',
    'מתת',
    'אבנת',
    'נעורים',
    'נאות סמדר',
    'נורית',
    'מצפה שלם',
    'מקווה ישראל',
    'סופה',
    'הר עמשא',
    'בקעות',
    'מכורה',
    'גלגל',
    'עין תמר',
    'באר מילכה',
    'חמרה',
    'חולית',
    'אחווה',
    'מאיר שפיה',
    'אלוני יצחק',
    'שחרות',
    'מבואות יריחו',
    'עמוקה',
    'לפידות',
    'כפר גלים',
    'מצפה',
    'כפר סילבר',
    'אשל הנשיא',
    'בית זיד',
    'שער מנשה',
    'בית צבי',
    'כדורי',
    'נווה חריף',
    'דייר ראפאת',
    'עזוז',
    'כרם בן שמן',
    'כנות',
    'נווה זוהר',
    'עיר אובות',
    'עין חצבה',
    'בית ברל',
    'יתיר',
    'קרית יערים',
    'מבואות ים',
    'קדמה',
    'כפר זוהרים',
    'אתגר',
    'עין כרם-ביס חקלאי',
    'בת חצור',
    'נווה אבות',
    'נמרוד',
    'גבעת שמש',
    'קרית שלמה',
    'שיטים',
    'אורנים',
    'איתנים',
    'חצרות חולדה',
    'חצרות כח'
    ];

export const sortedCitiesNames = citiesNames.sort(collator.compare);

