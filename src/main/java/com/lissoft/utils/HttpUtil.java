package com.lissoft.utils;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.lissoft.Constants;
import com.lissoft.to.http.HttpResponse;
import com.lissoft.to.http.MedServiceFieldResponse;
import com.lissoft.to.http.MedServiceGroupResponse;
import com.lissoft.to.http.MedServiceResponse;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Base64;
import java.util.stream.Collectors;

public class HttpUtil implements Constants {
    public static HttpResponse<MedServiceGroupResponse> getOrgMedicalData(String fullURL) {
        try {
            URL url = new URL(fullURL);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestProperty("Content-Type", "application/json");
            con.setRequestProperty("Authorization", "Basic " + Base64.getEncoder().encodeToString((technoMedUserName + ":" + technoMedPassword).getBytes()));
            con.setDoOutput(true);

            int responseCode = con.getResponseCode();
            System.out.println("Send getData Response Code :: " + responseCode);

            if (responseCode == HttpURLConnection.HTTP_OK) {
                BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
                String inputLine = in.lines().collect(Collectors.joining("\n"));
                in.close();
                return new Gson().fromJson(inputLine, new TypeToken<HttpResponse<MedServiceGroupResponse>>(){}.getType());
            }
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
        return null;
    }

    public static HttpResponse<MedServiceResponse> getOrgMedicalServiceData(String fullURL) {
        try {
            URL url = new URL(fullURL);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestProperty("Content-Type", "application/json");
            con.setRequestProperty("Authorization", "Basic " + Base64.getEncoder().encodeToString((technoMedUserName + ":" + technoMedPassword).getBytes()));
            con.setDoOutput(true);

            int responseCode = con.getResponseCode();
            System.out.println("Send getData Response Code :: " + responseCode);

            if (responseCode == HttpURLConnection.HTTP_OK) {
                BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
                String inputLine = in.lines().collect(Collectors.joining("\n"));
                in.close();
                return new Gson().fromJson(inputLine, new TypeToken<HttpResponse<MedServiceResponse>>(){}.getType());
            }
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
        return null;
    }

    public static HttpResponse<MedServiceFieldResponse> getOrgMedicalServiceFieldsData(String fullURL) {
        try {
            URL url = new URL(fullURL);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestProperty("Content-Type", "application/json");
            con.setRequestProperty("Authorization", "Basic " + Base64.getEncoder().encodeToString((technoMedUserName + ":" + technoMedPassword).getBytes()));
            con.setDoOutput(true);

            int responseCode = con.getResponseCode();
            System.out.println("Send getData Response Code :: " + responseCode);

            if (responseCode == HttpURLConnection.HTTP_OK) {
                BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
                String inputLine = in.lines().collect(Collectors.joining("\n"));
                in.close();
                return new Gson().fromJson(inputLine, new TypeToken<HttpResponse<MedServiceFieldResponse>>(){}.getType());
            }
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
        return null;
    }
}
