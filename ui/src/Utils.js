import React, {Component} from 'react';
import LocalizedStrings from 'react-localization';

export const apiHost = 'http://localhost:8080';
// export const apiHost = 'http://192.168.110.205:8080';

export const strings = new LocalizedStrings({
    uz: {
        logout: "Чиқиш",
        login: "Кириш",
        chequeNumber: "Чек рақами",
        enterDepartment: "Бўлимни танланг",
        enterLaboratory: "Лаборатория таҳлилини киритиш",
        enterDevice: "Курилма киритиш",
        parameters: "Параметрлар",
        name: "Номи",
        name2: "Номи",
        save: "Сақлаш",
        amount: "Суммаси",
        amountLimit: "Жами сони",
        organizationName: "Ташкилот номи",
        bankName: "Банк номи",
        accaountNumber: "Ҳисоб рақами",
        organizationDetails: "Ташкилот реквизитлари",
        inn: "ИНН",
        okonx: "ОКОНХ",
        address: "Манзили",
        phoneNumber: "Телефон рақами",
        email: "Email",
        director: "Рахбари",
        sex: "Жинси",
        man: "Эркак",
        woman: "Аёл",
        fullName: "Беморнинг Ф.И.Ш",
        membersFullName: "Ходимнинг Ф.И.Ш",
        age: "Ёши",
        region: "Ҳудуд",
        select: "Танланг",
        doctor: "Шифокор",
        dispatcher: "Диспетчер",
        apartmentNumber: "Хонадон №",
        entranceNumber: "Подъезд №",
        homeNumber: "Уй №",
        toBack: "Орқага",
        phoneNumberN: "Телефон №",
        paymentAmount: "Жами сумма",
        patient: "Бемор",
        selectDoctor: "Шифокорни танланг",
        problem: "Беморнинг шикояти",
        price: "Нархи",
        medicamentType: "Тиббий буюм",
        quantity: "Сони",
        lastName: "Фамилияси",
        updateDate: "Узгартирилган санаси",
        resultDate: "Натижа санаси",
        result: "Натижа",
        firstName: "Исми",
        middleName: "Шарифи",
        passportNumberCeria: "Паспорт серияси ва рақами",
        birthDate: "Туғилган вақти",
        laboratory: "Лаборатория",
        service1: "Хизмат",
        services: "Хизматлар",
        historyNumber: "Касаллик тарихи рақами",
        height: "Бўйи",
        weight: "Вазни",
        appointment: "Бемор рақами",
        medicine: "Дори",
        description: "Изоҳ",
        patients: "Беморлар рўйхати",
        reports: "Ҳисоботлар",
        settings: "Созламалар",
        bankAccaount: "Хисоб рақами",
        district: "Туман",
        street: "Кўча",
        entranceNumberN: "Подъезд №",
        calls: "Чақирувлар рўйхати",
        members: "Врачлар рўйхати",
        members2: "Ходимлар",
        memberList:"Ходимлар рўйхати",
        userName: "Логин:",
        password: "Парол:",
        oldPassword: "Аввалги парол:",
        purpose: "Қайси бўлимга",
        diagnosis: "Ташхис",
        allAmount: "Тўланадиган сумма:",
        payer: "Ким тўлайди:",
        basicInformation: "Асосий маълумотлар",
        thirdName: "Шарифи",
        sportsType: "Спорт тури",
        federation: "Федерацияси",
        currentAddress: "Ҳозирги яшаш манзили",
        regionQoraqalpoq: "Қорақалпоғистон Республикаси",
        regionAndijon: "Андижон вилояти",
        regionSirdaryo: "Сирдарё вилояти",
        regionFargona: "Фарғона вилояти",
        regionNamangan: "Наманган вилояти",
        regionToshkent: "Тошкент вилояти",
        regionSamarqand: "Самарқанд вилояти",
        regionJizzax: "Жиззах вилояти",
        regionQashqadaryo: "Қашқадарё вилояти",
        regionSurxondaryo: "Сурхондарё вилояти",
        regionNavoiy: "Навоий вилояти",
        regionBuxoro: "Бухоро вилояти",
        regionXorazm: "Хоразм вилояти",
        cityToshkent: "Тошкент шаҳри",
        nation: "Миллати",
        nationUz: "Ўзбек",
        nationRus: "Рус",
        nationQora: "Қорақалпоқ",
        nationQozoq: "Қозоқ",
        nationQirg: "Қирғиз",
        nationTojik: "Тожик",
        nationTurk: "Туркман",
        yes: "Ҳа",
        no: "Йўқ",
        doctorsCheck: "Мутахассис кўриги",
        expertOpinion: "Мутахассис хулосаси",
        topExpertOpinion: "Тор мутахассислар хулосаси",
        conclusion: "Хулоса",
        conclusion2: "хулосаси",
        recommendation: "Тавсиянома",
        recommendation2: "Тавсия",
        recommendations: 'Тавсиялар',
        deputyorMedicalDirector: 'Ўринбосар ёки тиббий директор',
        generalLaboratories: "Лаборатория мудири",
        popular: "Аҳоли",
        exit: 'Чиқиш',
        time: "Вақти",
        laboratoryExamination: "Лаборатория текшируви",
        typeService: "Хизмат тури",
        resultInspection: "Текширув натижаси:",
        typeInspection: "Текширув тури",
        doctorLoborant: "Врач/Лаборант",
        listOfLaboratories: "Лаборатория таҳлиллари рўйхати",
        listOfDevices: "Курилмалар рўйхати",
        typeAnalysis: 'Таҳлил тури',
        addLabAnalysis: "Лаборатория таҳлили қўшиш",
        add: " Қўшиш",
        search: "Қидириш",
        searchKeyword: "Қидирув сўзини киритинг",
        condition1: "Ҳолати",
        patientInformation: 'Бемор маълумотлари',
        general: "Умумий",
        stop: 'Пауза',
        numberSymbol:"№",
        patientVisits:"Беморнинг ташрифлари",
        name1:"Номи",
        comment1:"Изоҳ",
        medEquipment:"Тиббий анжом",
        medEquipmentList:"Тиббий анжомлар рўйхати",
        medicalEquipment:"Тиббий анжомларни киритиш",
        laboratoryAnalysis:"Лаборатория таҳлиллари",
        laboratoryAnalyse:"Лаборатория таҳлили",
        employeeInformation:"Ходимлар маълумотлари",
        position:"Лавозими",
        addEmployee:"Ходим қўшиш",
        cage:"#",
        serviceName:"Хизмат номи",
        servicePrice:"Хизмат нархи",
        enterService:"Хизмат турларини киритиш",
        treatmentTime:"Кўрик/даволанган вақти",
        inTotal:"жами",
        january:"январь",
        february:"февраль",
        march:"март",
        april:"апрель",
        may:"май",
        june:"июнь",
        july:"июль",
        august:"август",
        september:"сентябрь",
        october:"октябрь",
        november:"ноябрь",
        december:"декабрь",
        totalNumbers:"Жами қабул сони",
        patientNumber:"Беморлар сони",
        patientKoykaDay:"Беморнинг койкадаги куни",
        analysesNumber:"Олинган таҳлиллар сони",
        checksNumber:"Текширувлар",
        completed:"Бажарилган",
        action:"Амал",
        usedMedical1:"Ишлатилган тиббий буюмлар",
        addOperation:"Амалиёт қўшиш",
        dateMonth:"Кун ой йил",
        standard:"Норматив",
        results:"натижалари",
        districtBektemir:"Бектемир тумани",
        districtChilonzor:"Чилонзор тумани",
        districtMirobod:"Миробод тумани",
        districtMirzoulugbek:"Мирзо Улуғбек тумани",
        districtOlmazor:"Олмазор тумани",
        districtSergili:"Сергели тумани",
        districtShayhxontohur:"Шайхонтохур тумани",
        districtUchtepa:"Учтепа тумани",
        districtYakkasaroy:"Яккасарой тумани",
        districtYashnobod:"Яшнобод тумани",
        districtYunusobod:"Юнусобод тумани",
        territory:"Ҳудуд",
        visitType:"Ташриф тури:",
        appointmentData:"Врач қабули",
        patientData:"Бемор маълумотлари",
        enterPatient:"Бемор маълумотини киритиш",
        totalNumber:"Жами сони:",
        completedNumber:"Бажарилган сони:",
        login1:"Тизимга кириш",
        doctorSignature:"Шифокор имзоси",
        headDepartment:"Бўлим мудири:",
        department:"Бўлим",
        laborant:"Лаборант",
        payType:"Тўлов статуси",
        expert:"Мутахассис",
        laboratories:"Лабораториялар",
        receiptType: "Қабул тури:",
        enterPatientData: "Бемор маълумотини киритиш",
        addServices: "Хизмат турларини қўшиш",
        enterAllData: "Ҳамма маълумотни киритинг",
        register: "Рўйхатга олиш",
        listOrder: "Тартиб рақами",
        year: "Йиллар",
        edit: "Таҳрирлаш",
        changePassword: "Паролни ўзгартириш",
        paymentStatus: "Тўлов ҳолати",
        member: "Ходим",
        unitMeasurement: "Ўлчови",
        currentDate: "Сана",
        diary: "Кундалик",
        atTheEnd: "Хотима",
        checkResults: "Текширув натижалари",
        uploadCheckResults: "Текширув натижаларини юкланг",
        list: "Рўйхат",
        remove: "Ўчириш",
        addService: "Хизмат турини киритиш",
        editService: "Хизмат турини таҳрирлаш",
        enterServiceName: "Хизмат номини киритинг",
        enterServicePrice: "Хизмат нархини киритинг",
        enterServiceCategory: "Хизмат турини танланг",
        printBarCode: "Штрих код печат қилиш",
        summaryNumbers: "Жами:",
        exportToPDF: "PDF га экспорт қилиш",
        exportToExcel: "Excel га экспорт қилиш",
        selectLaboratoryItem: "Лаборатория таҳлилини танланг",
        enterLastName: "Фамилиясини киритинг",
        enterFirstName: "Исмини киритинг",
        enterMiddleName: "Шарифини киритинг",
        addNewTemplate: "Шаблон қўшиш",
        medicamentUnit: "Ўлчов бирлиги",
        inputCheckData: "Текширув натижаларини киритиш",
        instruction: "Йўриқнома",
        clinicList: "Клиникалар рўйхати"
    },
    ru: {
        logout: "Выйти",
        login: "Войти",
        chequeNumber: "Номер чека",
        enterDepartment: "Выберите отделение",
        enterLaboratory: "Ввод лабораторные анализы",
        parameters: "Параметры",
        name: "Имя",
        name2: "Названия",
        save: "Cохранить",
        amount: "Сумма",
        amountLimit:"Общие количество",
        organizationName: "Название организации",
        bankName: "Название банка",
        accountNumber: "Номер счета",
        organizationDetails: "Детали организации",
        inn: "ИНН",
        okonx: "ОКОНХ",
        address: "Адрес",
        phoneNumber: "Номер телефона",
        email: "Электронная почта",
        director: "Директор",
        sex: "Пол",
        man: "Мужской",
        woman: "Женский",
        fullName: "Ф.И.О пациента",
        membersFullName: "Ф.И.О сотрудника",
        age: "Возраст",
        region: "Регион",
        select: "Выберите",
        doctor: "Врач",
        dispatcher: "Диспетчер",
        apartmentNumber: "Квартира №",
        entranceNumber: "Подъезд №",
        homeNumber: "Дом №",
        toBack: "Назад",
        phoneNumberN: "Телефон №",
        paymentAmount: "Итоговая сумма",
        patient: "Пациент",
        selectDoctor: "Выбрать врача",
        problem: "Жалобы пациента",
        price: "Стоимость",
        medicamentType: "Медицинский прибор",
        quantity: "Количество",
        lastName: "Фамилия",
        firstName: "Имя",
        middleName: "Отчество",
        passportNumberCeria: "Серия и номер паспорта",
        birthDate: "Дата рождения",
        laboratory: "Лаборатория",
        service1: "Услуга",
        services: "Услуги",
        historyNumber: "Номер истории болезни",
        bloodGroup: "Группа крови",
        height: "Высота",
        weight: "Масса",
        appointment: "Пациент номер",
        medicine: "Лекарство",
        description: "Примечание",
        patients: "Список пациентов",
        reports: "Отчеты",
        settings: "Настройки",
        bankAccaount: "Номер счета",
        district: "Район",
        street: "Улица",
        entranceNumberN: "Подъезд №",
        calls: "Список вызовов",
        members: "Список врачей",
        members2: "Сотрудники",
        memberList:"Список сотрудников",
        userName: "Логин:",
        password: "Парол:",
        oldPassword: "Старый парол:",
        purpose: "Какой раздел",
        diagnosis: "Диагноз",
        allAmount: "Подлежащая уплате сумма:",
        payer: "Кто платит:",
        basicInformation: "Основная информация",
        thirdName: "Отчество",
        sportsType: "Вид спорта",
        federation: "Федерация",
        currentAddress: "Текуший адрес",
        regionQoraqalpoq:"Республикаса Каракалпакистан",
        regionAndijon:"Андижанский область",
        regionSirdaryo:"Сырдаринский область",
        regionFargona:"Ферганский область",
        regionNamangan:"Наманганский область",
        regionToshkent:"Ташкентский область",
        regionSamarqand:"Самаркандский область",
        regionJizzax:"Джизакский область",
        regionQashqadaryo:"Кашкадаринский область",
        regionSurxondaryo:"Сурхандаринский область",
        regionNavoiy:"Навоинский область",
        regionBuxoro:"Бухаринский область",
        regionXorazm:"Хорезмский область",
        cityToshkent:"Город Ташкент",
        nation:"Национальность",
        nationUz:"Узбек",
        nationRus:"Рус",
        nationQora:"Каракалпак",
        nationQozoq:"Казак",
        nationQirg:"Киргиз",
        nationTojik:"Таджик",
        nationTurk:"Туркмен",
        yes:"Ха",
        no:"Йўқ",
        result:"Результат",
        doctorsCheck: "Осмотр специалиста",
        expertOpinion:"Мнение эксперта",
        topExpertOpinion:"Мнение лучших экспертов",
        conclusion:"Заключения",
        conclusion2:"Заключения",
        recommendation:"рекомендация",
        recommendation2:"Рекомендация",
        recommendations:'Рекомендации',
        deputyorMedicalDirector:'Заместитель или медицинский директор',
        generalLaboratories:"главная лабаратория",
        popular: "Население",
        exit: 'Выход',
        time: "Время",
        laboratoryExamination: "Лабораторное обследование",
        typeService: "Тип сервиса",
        resultInspection: "Результат проверки:",
        typeInspection: "Тип проверки",
        doctorLoborant: "Врач/Лаборант",
        listOfLaboratories: "Список лабораторных анализов",
        typeAnalysis: 'Тип анализа',
        addLabAnalysis: "Добавить лабораторный анализ",
        add: " Добавить",
        search: "Поиск",
        searchKeyword: "Введите ключевая слова",
        condition1: 'Состояние',
        patientInformation: 'Информация о пациенте',
        general: "Общий",
        howConductSportsTraining: "Как проводить спортивную тренировку",
        stop: 'Пауза',
        numberSymbol:"№",
        patientVisits:"Визиты пациента",
        name1:"Имя",
        comment1:"Примечание",
        medEquipment:"Медицинского оборудования",
        medEquipmentList:"Список медицинского оборудования",
        medicalEquipment:"Введение медицинского оборудования",
        employeeInformation:"Информация о сотрудниках",
        position:"Должность",
        addEmployee:"Добавить персонал",
        cage:"#",
        serviceName:"Названия услуги",
        servicePrice:"Цена услуги",
        enterService:"Ввести типы услуг",
        treatmentTime:"Время просмотра/лечения",
        laboratoryAnalysis:"Лабораторные анализы",
        laboratoryAnalyse:"Лабораторный анализ",
        inTotal:"всего",
        january:"январь",
        february:"февраль",
        march:"март",
        april:"апрель",
        may:"май",
        june:"июнь",
        july:"июль",
        august:"август",
        september:"сентябрь",
        october:"октябрь",
        november:"ноябрь",
        december:"декабрь",
        totalNumbers:"Общее число приемов",
        patientNumber:"Количество пациентов",
        patientKoykaDay:"День пациента в постели",
        analysesNumber:"Олинган таҳлиллар сони",
        checksNumber:"Проверки",
        completed:"Выполнено",
        action:"Действие",
        usedMedical1:"Использованные медицинские изделия",
        addOperation:"Добавить операцию",
        dateMonth:"День месяц год",
        standard:"Норматив",
        results:"результаты",
        districtBektemir:"Бектемирский район",
        districtChilonzor:"Чиланзарский район",
        districtMirobod:"Мирабадский район",
        districtMirzoulugbek:"Мирзо-Улугбекский район",
        districtOlmazor:"Алмазарский район",
        districtSergili:"Сергелинский район",
        districtShayhxontohur:"Шайхонтохурский район",
        districtUchtepa:"Учтепинский район",
        districtYakkasaroy:"Яккасарайский район",
        districtYashnobod:"Яшнабадский район",
        districtYunusobod:"Юнусабадский район",
        territory:"Территория",
        visitType:"Тип визита:",
        appointmentData:"Прием у доктора",
        patientData: "Данных пациента",
        enterPatient:"Ввести данные о пациенте",
        medicalWorker:"Медицинский работник",
        duration:"Продолжительность",
        appointmentList:"Список Аппоинтментов",
        totalNumber:"Общее число:",
        completedNumber:"Количество выполненных:",
        login1:"Войти в систему",
        doctorSignature:"Подпись врача",
        treatingPhysician:"Лечащий врач:",
        headDepartment:"Заведующий отделом:",
        department:"Отдел",
        laborant:"Лаборант",
        payType:"Статус платежа",
        expert:"Специалист",
        laboratories:"Лаборатории",
        receiptType: "Тип приема:",
        enterPatientData: "Ввод данных пациента",
        addServices: "Добавление сервисов",
        enterAllData: "Введите все данные",
        register: "Регистрация",
        listOrder: "Порядковый номер",
        year: "Годы",
        edit: "Редактировать",
        changePassword: "Изменить парол",
        paymentStatus: "Статус оплата",
        member: "Сотрудник",
        unitMeasurement: "Единица измерения",
        currentDate: "Число",
        diary: "Ежедневник",
        atTheEnd: "Финиш",
        checkResults: "Результаты проверки",
        uploadCheckResults: "Загрузите результаты проверки",
        list: "Список",
        remove: "Удалить",
        addService: "Добавить услуга",
        editService: "Редактировать услуга",
        enterServiceName: "Введите названия услуга",
        enterServicePrice: "Введите цена услуга",
        enterServiceCategory: "Введите категория услуга",
        printBarCode: "Печать штрих кода",
        summaryNumbers: "Всего:",
        exportToPDF: "Экспорт на PDF",
        exportToExcel: "Экспорт на Excel",
        selectLaboratoryItem: "Выберите лабораторный анализ",
        enterLastName: "Введите фамилия",
        enterFirstName: "Введите имя",
        enterMiddleName: "Введите отчество",
        addNewTemplate: "Добавить шаблон",
        medicamentUnit: "Единица измерения",
        inputCheckData: "Ввод результаты обследования",
        instruction: "Инструкция",
        clinicList: "Список клиники"
    }
});
strings.setLanguage('uz');

export function getStates() {
    return [<option key="0" value="0">{strings.select}</option>,
        <option key="1" value="1">{strings.regionQoraqalpoq}</option>,
        <option key="2" value="2">{strings.regionAndijon}</option>,
        <option key="3" value="3">{strings.regionBuxoro}</option>,
        <option key="4" value="4">{strings.regionQashqadaryo}</option>,
        <option key="5" value="5">{strings.regionJizzax}</option>,
        <option key="6" value="6">{strings.regionNavoiy}</option>,
        <option key="7" value="7">{strings.regionNamangan}</option>,
        <option key="8" value="8">{strings.regionSamarqand}</option>,
        <option key="9" value="9">{strings.regionSirdaryo}</option>,
        <option key="10" value="10">{strings.regionSurxondaryo}</option>,
        <option key="11" value="11">{strings.regionToshkent}</option>,
        <option key="12" value="12">{strings.regionFargona}</option>,
        <option key="13" value="13">{strings.regionXorazm}</option>,
        <option key="14" value="14">{strings.cityToshkent}</option>];
}

export function clearBrowserData() {
    localStorage.removeItem('appointmentId');
    localStorage.removeItem('appointment');
    localStorage.removeItem('laboratory');
    localStorage.removeItem('patient');
    localStorage.removeItem('appointmentLaboratoryId');
}

export function getUser() {
    let user = localStorage.getItem('user');
    if (user !== undefined && user !== null) {
        user = JSON.parse(user);
    } else {
        user = null;
    }
    if (user === null) {
        user = {
            department: '',
            roles: [

            ]
        }
    }
    return user;
}

export function isLaboratory(user) {
    return user !== undefined && user !== null && (user.role === 'LABORATORY' || user.role === 'DOCTOR_LABORANT' || user.role === 'HEAD_OF_LABORANTS');
}

export function isHeadOfLaboratory(user) {
    return user !== undefined && user !== null && user.role === 'HEADOFLABORATORY';
}

export function isAdmin(user) {
    return user !== undefined && user !== null && user.roles[0] === 'ADMIN';
}

export function isLaboratoryDepartment() {
    let user = getUser();
    return user.department !== undefined && user.department !== null && user.department.includes('LABORATORY');
}

export function getKey() {
    return Math.random() * 100000000000000000;
}

export function checkValid(value) {
    return value !== undefined && value !== null && value !== '';
}

export function checkNumberValid(fieldValue) {
    return fieldValue !== undefined && fieldValue !== null && fieldValue !== '' && fieldValue > 0;
}

export function checkDateValid(fieldValue) {
    return fieldValue !== undefined && fieldValue !== null && fieldValue !== '' && fieldValue < new Date(2010, 0, 1, 0, 0, 0, 0).getTime();
}

export function validateField(fieldId, fieldValue, errors) {
    if (!checkValid(fieldValue)) {
        document.getElementById(fieldId).style.boxShadow = "0px 0px 5px 5px red";
        errors++;
    }
    return errors;
}

export function validateNumberField(fieldId, fieldValue, errors) {
    if (fieldValue !== undefined && fieldValue !== null && fieldValue !== '' && fieldValue !== 0) {
        document.getElementById(fieldId).style.boxShadow = "0px 0px 5px 5px red";
        errors++;
    }
    return errors;
}

export function validateDateField(fieldId, fieldValue, errors) {
    if (!checkDateValid(fieldValue)) {
        document.getElementById(fieldId).style.boxShadow = "0px 0px 5px 5px red";
        errors++;
    }
    return errors;
}

export function validateSelect(fieldId, errors) {
    let fieldVal = document.getElementById(fieldId).value;
    if (fieldVal === undefined || fieldVal === null || fieldVal === '' || fieldVal === '0') {
        document.getElementById(fieldId).style.boxShadow = "0px 0px 5px 5px red";
        errors++;
    }
    return errors;
}

export function inputValueChanged(e) {
    if (checkValid(e.target.value)) {
        e.target.style.boxShadow = "none";
    } else if (checkValid(e.target.value)) {
        e.target.style.boxShadow = "0px 0px 5px 5px red";
    }
}

export function selectValueChanged(e) {
    if (validateSelect(e.target.id, 0) === 0) {
        e.target.style.boxShadow = "none";
    }
}

export function redirectToLogin() {
    window.open('/', '_self');
}

export function checkUserRole(role) {
    let user = getUser();
    if (user === undefined || user === null || (user.roles !== null && user.roles !== undefined && user.roles[0] !== role)) {
        redirectToLogin();
    }
}

export function checkUserAnyRoles(departments) {
    if (departments !== undefined && departments !== null && departments !== '') {
        let departmentList = departments.split(',');
        let user = getUser();
        if (user === undefined || user === null) {
            let containStr = 0;
            for (let i=0; i<departmentList.length; i++) {
                if (user.department.includes(departmentList[i])) {
                    containStr += 1;
                }
            }
            if (containStr > 0) {
                redirectToLogin();
            }
        }
    }
}

export function hasRole(role) {
    let user = getUser();
    return user !== undefined && user !== null && user.role === role;
}

export function getDepartmentName() {
    let user = getUser();
    return user !== undefined && user !== null ? user.department : '';
}

export function getMonthDatesCount() {
    let date = new Date();
    return new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
}

export function getMonthName(month) {
    let monthName = '';
    switch (month) {
        case 0: monthName = "январь"; break;
        case 1: monthName = "феврал"; break;
        case 2: monthName = "март"; break;
        case 3: monthName = "апрель"; break;
        case 4: monthName = "май"; break;
        case 5: monthName = "июнь"; break;
        case 6: monthName = "июль"; break;
        case 7: monthName = "август"; break;
        case 8: monthName = "сентябрь"; break;
        case 9: monthName = "октябрь"; break;
        case 10: monthName = "ноябрь"; break;
        case 11: monthName = "декабрь"; break;
        default: monthName = ''; break;
    }
    return monthName;
}

export function logout() {
    clearBrowserData();
    const loader = document.querySelector('.loaderBox');
    loader.classList.remove('loaderBox');
    loader.classList.add('loader--hide');
    // localStorage.removeItem('user');
    window.open('/', '_self');
}

class Utils extends Component {

}

export default Utils;