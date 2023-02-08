package com.lissoft;

import com.lissoft.utils.DateUtil;
import org.junit.Test;

import java.sql.*;
import java.util.Calendar;
import java.util.Date;

public class AccessReaderTest {

    @Test
    public void readAccessFileWithPassword() {
        try {
            Class.forName("net.ucanaccess.jdbc.UcanaccessDriver");
            Connection con= DriverManager.getConnection("jdbc:ucanaccess://D:\\Db200.mdb;com.lissoft.fetcher.CryptCodecOpener", "", "123");
            Statement st= con.createStatement();
            Statement st2= con.createStatement();

            ResultSet rs= st.executeQuery("select ID as sID, QuestDate as qDate from Sample where (QuestDate>" +
                    DateUtil.startDateFormat.format(new Date(122, Calendar.OCTOBER, 20)) + ") AND (QuestDate<" + DateUtil.endDateFormat.format(new Date(122, Calendar.OCTOBER, 31)) + ") " +
                    "and ID between 40 and 42 order by ID asc");

            while (rs.next()){
                System.out.println(rs.getString("sID") + "\t\t\t" + rs.getTimestamp("qDate"));
                ResultSet rs2 = st2.executeQuery("select tdet.ID as dID, tdef.FullName AS TestName, tdet.TestResult AS TestResult from TestDetail tdet " +
                        "inner join TestDefine tdef on tdet.ItemID=tdef.ID " +
                        "where tdet.SampleID=" + rs.getString("sID") + " and tdet.TestTime=" + DateUtil.dateFormat.format(rs.getTimestamp("qDate")) +
                        " order by tdet.ID asc");
                while (rs2.next()) {
                    System.out.println(rs.getString("sID") + "\t\t\t" + rs2.getString("dID") + "\t\t\t" + rs2.getString("TestName") + "\t\t\t" + rs2.getString("TestResult"));
                }
            }
            st.close();
            st2.close();
            con.close();
        } catch (ClassNotFoundException | SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
