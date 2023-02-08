package com.lissoft.fetcher;

import com.lissoft.dao.ClinicDeviceRepository;
import com.lissoft.to.AccessFileTo;
import com.lissoft.to.http.MessageResponse;
import com.lissoft.utils.DateUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.sql.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.regex.Pattern;

@Component
@RequiredArgsConstructor
//@Scheduled(cron="0 0 * * * ?")
public class AccessReader {

    private final ClinicDeviceRepository clinicDeviceRepository;


    @Scheduled(cron = "0 0 * * * ?")
    public void sycData(String resultFilePassword, String resultFileName, Date startDate, Date endDate) {
        try {

           resultFileName=resultFileName.replaceAll("\\\\","/");
            long startTime = System.currentTimeMillis();
            System.out.println("Now is " + new Date());

            Class.forName("net.ucanaccess.jdbc.UcanaccessDriver");
            Connection con = DriverManager.getConnection("jdbc:ucanaccess://" + resultFileName, "", resultFilePassword);
            Statement st = con.createStatement();
            Statement st2 = con.createStatement();

            ResultSet rs = st.executeQuery("select ID as sID, QuestDate as qDate from Sample where (QuestDate>" + DateUtil.startDateFormat.format(startDate) + ") AND (QuestDate<" + DateUtil.endDateFormat.format(endDate) + ") " +
                    "and ID between 40 and 42 order by ID asc");

            while (rs.next()) {
                System.out.println(rs.getString("sID") + "\t\t\t" + rs.getTimestamp("qDate"));
                ResultSet rs2 = st2.executeQuery("select tdet.ID as dID, tdef.FullName AS TestName, tdet.TestResult AS TestResult from TestDetail tdet " +
                        "inner join TestDefine tdef on tdet.ItemID=tdef.ID " +
                        "where tdet.SampleID=" + rs.getString("sID") + " and tdet.TestTime=" + DateUtil.dateFormat.format(rs.getTimestamp("qDate")) +
                        " order by tdet.ID asc");
                while (rs2.next()) {
                    System.out.println(rs.getString("sID") + "\t\t\t" + rs2.getString("dID") + "\t\t\t" + rs2.getString("TestName") + "\t\t\t" + rs2.getString("TestResult"));

                }
            }
            long endTime = System.currentTimeMillis();
            System.out.println("Execution time: " + (endTime - startTime));
            st.close();
            st2.close();
            con.close();
        } catch (SQLException | ClassNotFoundException e) {
            throw new RuntimeException(e);
        }
    }



}

