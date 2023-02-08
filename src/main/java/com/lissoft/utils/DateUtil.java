package com.lissoft.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

public class DateUtil {

    private static SimpleDateFormat dateFormat1 = new SimpleDateFormat("dd.MM.yyyy");
    private static SimpleDateFormat dateFormat2 = new SimpleDateFormat("dd.MM.yyyy HH:mm");
    private static SimpleDateFormat dateFormat3 = new SimpleDateFormat("dd.MM.yyyy");
    public static SimpleDateFormat dateFormat4 = new SimpleDateFormat("MMMM yyyy");
    public static SimpleDateFormat dateFormat5 = new SimpleDateFormat("yyyyMMdd");
    public static SimpleDateFormat dateFormat = new SimpleDateFormat("#MM/dd/yyyy HH:mm:ss#");
    public static SimpleDateFormat startDateFormat = new SimpleDateFormat("#MM/dd/yyyy 00:00:00#");
    public static SimpleDateFormat endDateFormat = new SimpleDateFormat("#MM/dd/yyyy 23:59:59#");

    public static String formatDate1(Date date) {
        if (date != null) {
            return dateFormat1.format(date);
        }
        return "";
    }
    public static String formatDate2(Date date) {
        if (date != null) {
            return dateFormat2.format(date);
        }
        return "";
    }

    public static Date getDayStart(Date date) {
        GregorianCalendar calendar = new GregorianCalendar();
        calendar.setTime(date);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        return calendar.getTime();
    }

    public static Date getDayEnd(Date date) {
        GregorianCalendar calendar = new GregorianCalendar();
        calendar.setTime(date);
        calendar.set(Calendar.HOUR_OF_DAY, 23);
        calendar.set(Calendar.MINUTE, 59);
        calendar.set(Calendar.SECOND, 59);
        calendar.set(Calendar.MILLISECOND, 999);
        return calendar.getTime();
    }

    public static Date addDays(Date date, int day) {
        GregorianCalendar calendar = new GregorianCalendar();
        calendar.setTime(date);
        calendar.add(Calendar.DATE, day);
        return calendar.getTime();
    }

    public static Date getMonthStart(Date date) {
        GregorianCalendar calendar = new GregorianCalendar();
        calendar.setTime(date);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);

        calendar.set(Calendar.DATE, 1);
        return calendar.getTime();
    }

    public static Date getMonthEnd(Date date) {
        GregorianCalendar calendar = new GregorianCalendar();
        calendar.setTime(date);
        calendar.set(Calendar.HOUR_OF_DAY, 23);
        calendar.set(Calendar.MINUTE, 59);
        calendar.set(Calendar.SECOND, 59);
        calendar.set(Calendar.MILLISECOND, 999);

        calendar.set(Calendar.DATE, 1);
        calendar.set(Calendar.MONTH, calendar.get(Calendar.MONTH) + 1);
        calendar.set(Calendar.DATE, calendar.get(Calendar.DATE) - 1);
        return calendar.getTime();
    }

    public static Date parseBirthDate(String date) {
        if (date != null) {
            try {
                return dateFormat3.parse(date);
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
        return null;
    }

    public static Integer getMonthDaysCount(Integer month) {
        if (month != null) {
            switch (month) {
                case 0:
                case 2:
                case 4:
                case 6:
                case 7:
                case 9:
                case 11: return 31;
                case 3:
                case 5:
                case 8:
                case 10: return 30;
                case 1: return 28;
            }
        }
        return null;
    }

    public static String getMonthName(Integer month) {
        String monthName = "";
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
            default: monthName = ""; break;
        }
        return monthName;
    }

    public static Integer getCurrentYear() {
        return new Date().getYear() + 1900;
    }
}
