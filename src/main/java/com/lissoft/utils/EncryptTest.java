package com.lissoft.utils;

import org.apache.commons.io.IOUtils;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

public class EncryptTest {
    public static void main(String[] args) {

        System.out.println(new BCryptPasswordEncoder().encode("2000"));

    }
}
