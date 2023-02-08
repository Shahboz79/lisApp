package com.lissoft.utils;

import com.lissoft.to.SimpleTO;
import org.apache.commons.lang3.StringUtils;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URISyntaxException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Random;

public class StringUtil {

    private static final String vowels = "aeiouy";
    private static final String consonants = "bcdfghjklmnpqrstvwxz";
    private static final String digits = "0123456789";
    public static String separator = System.getProperty("file.separator");
    public static String fontURL = "C:/Windows/Fonts/times.ttf";
//    public static String fontURL = "/opt/tomcat/webapps/ROOT/fonts/times.ttf";

    public static String generatePassword(int len) {
        StringBuilder result = new StringBuilder();
        Random rand = new Random();
        String myVowels = vowels.toLowerCase() + vowels.toUpperCase();
        String myCons = consonants.toLowerCase() + consonants.toLowerCase() + consonants.toUpperCase();
        StringBuilder myLetters = new StringBuilder();
        myLetters.append(myVowels.repeat(10));
        myLetters.append(myCons);
        myLetters.append(digits.repeat(3));

        for (int i=0; i<len; i++) {
            int ind = rand.nextInt(myLetters.length());
            result.append(myLetters.substring(ind, ind + 1));
        }
        return result.toString();
    }

    public static String cleanRussianString(String word) {
        if (word == null) return "";
        try {
            return new String(word.getBytes("CP1251"), StandardCharsets.UTF_8);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return "";
    }

    public static String cleanPhoneNumber(String phoneNumber) {
        if (StringUtils.isEmpty(phoneNumber)) {
            return "";
        }
        phoneNumber = phoneNumber.trim();
        return phoneNumber.replaceAll("\\+", "").replaceAll(" ", "").replaceAll(",", "");
    }

    public static String getFileUrl() {
        String absolutePath = "";
        try {
            final String path = Paths.get(StringUtil.class.getProtectionDomain().getCodeSource().getLocation().toURI()).toString();
            absolutePath = path.replace(separator + "classes", "").replace(separator + "WEB-INF", "") + separator + "files" + separator;
            File file = new File(absolutePath);
            if (!file.exists()) {
                Files.createDirectories(Paths.get(absolutePath));
            }
        } catch (URISyntaxException | IOException e) {
            e.printStackTrace();
        }
        return absolutePath;
    }

    public static String getFileUrl(String filePath) {
        String absolutePath = "";
        try {
            absolutePath = getFileUrl() + filePath;
            File file = new File(absolutePath);
            if (!file.exists()) {
                Files.createDirectories(Paths.get(absolutePath));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return absolutePath;
    }

    public static String makeZeroLead(Long number, int len) {
        StringBuilder n = new StringBuilder("" + number);
        while (n.length()<len) {
            n.insert(0, "0");
        }
        return n.toString();
    }

    public static SimpleTO getSex(Long sex) {
        if (sex != null) {
            switch (sex.intValue()) {
                case 1: return new SimpleTO(sex, "Эркак");
                case 2: return new SimpleTO(sex, "Аёл");
            }
        }
        return new SimpleTO();
    }
}
