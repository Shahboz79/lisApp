package com.lissoft.test;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.InetAddress;
import java.net.Socket;
import java.net.UnknownHostException;
import java.util.HashMap;
import java.util.Map;

@Component
public class BC5000Listener {

    private int portNumber;
    private InetAddress IPAddress;

    public BC5000Listener() throws UnknownHostException {
        this.portNumber =5100 ;
        this.IPAddress =InetAddress.getByName("192.168.0.4") ;
    }
    private static final Map<String, String> params = new HashMap<>();
    public void initialize(){
    try (Socket socket = new Socket(IPAddress,portNumber)){

//        InputStream input = socket.getInputStream();
//        BufferedReader reader = new BufferedReader(new InputStreamReader(input));
//
//        String s = reader.readLine();
//
//        System.out.println(s);
        String s="MSH|^~\\&|||||20230207140658||ORU^R01|2|P|2.3.1||||||UNICODEPID|1||^^^^MRPV1|1OBR|1||105|" +
                "00001^Automated Count^99MRC|||20230207114941|||||||||||||||20230207132637||HMOBX|1|IS|08001^" +
                "Take Mode^99MRC||O||||||FOBX|2|IS|08002^Blood Mode^99MRC||W||||||FOBX|3|IS|08003^Test Mode^99MRC" +
                "||CBC+DIFF||||||FOBX|4|IS|01002^Ref Group^99MRC||РћР±С‰Р°СЏ||||||FOBX|5|NM|6690-2^" +
                "WBC^LN||7.34|10*9/L|4.00-10.00|N|||FOBX|6|NM|704-7^" +
                "BAS#^LN||0.01|10*9/L|0.00-0.10|N|||FOBX|7|NM|706-2^" +
                "BAS%^LN||0.1|%|0.0-1.0|N|||FOBX|8|NM|751-8^" +
                "NEU#^LN||4.93|10*9/L|2.00-7.00|N|||FOBX|9|NM|770-8^" +
                "NEU%^LN||67.1|%|50.0-70.0|N|||FOBX|10|NM|711-2^" +
                "EOS#^LN||0.12|10*9/L|0.02-0.50|N|||FOBX|11|NM|713-8^" +
                "EOS%^LN||1.7|%|0.5-5.0|N|||FOBX|12|NM|731-0^" +
                "LYM#^LN||1.91|10*9/L|0.80-4.00|N|||FOBX|13|NM|736-9^" +
                "LYM%^LN||26.1|%|20.0-40.0|N|||FOBX|14|NM|742-7^" +
                "MON#^LN||0.37|10*9/L|0.12-1.20|N|||FOBX|15|NM|5905-5^" +
                "MON%^LN||5.0|%|3.0-12.0|N|||FOBX|16|NM|789-8^" +
                "RBC^LN||5.61|10*12/L|3.50-5.50|H~N|||FOBX|17|NM|718-7^" +
                "HGB^LN||168|g/L|110-160|H~N|||FOBX|18|NM|787-2^" +
                "MCV^LN||86.4|fL|80.0-100.0|N|||FOBX|19|NM|785-6^" +
                "MCH^LN||30.0|pg|27.0-34.0|N|||FOBX|20|NM|786-4^" +
                "MCHC^LN||347|g/L|320-360|N|||FOBX|21|NM|788-0^" +
                "RDW-CV^LN||13.5|%|11.0-16.0|N|||FOBX|22|NM|21000-5^" +
                "RDW-SD^LN||44.6|fL|35.0-56.0|N|||FOBX|23|NM|4544-3^" +
                "HCT^LN||48.5|%|37.0-54.0|N|||FOBX|24|NM|777-3^" +
                "PLT^LN||229|10*9/L|100-300|N|||FOBX|25|NM|32623-1^" +
                "MPV^LN||9.5|fL|7.0-11.0|N|||FOBX|26|NM|32207-3^" +
                "PDW^LN||15.8||9.0-17.0|N|||FOBX|27|NM|10002^" +
                "PCT^99MRC||0.216|%|0.108-0.282|N|||F";
        String[] split = s.toString().split("FOBX");
        for (String line: split) {
            line = line.trim();
            if (line.contains("WBC")) {
                putToParams("WBC", line.substring(line.indexOf("WBC")+8,line.indexOf("WBC")+12).trim());
            } else if (line.contains("RBC")) {
                putToParams("RBC", line.substring(line.indexOf("RBC")+8,line.indexOf("RBC")+12).trim());
            } else if (line.contains("HGB")) {
                putToParams("HGB", line.substring(line.indexOf("HGB")+8,line.indexOf("HGB")+11).trim());
            } else if (line.contains("HCT")) {
                putToParams("HCT", line.substring(line.indexOf("HCT")+8,line.indexOf("HCT")+12).trim());
            } else if (line.contains("PLT")) {
                putToParams("PLT", line.substring(line.indexOf("PLT")+8,line.indexOf("PLT")+11).trim());
            }else if (line.contains("PLT")) {
                putToParams("PLT", line.substring(line.indexOf("PLT")+8,line.indexOf("PLT")+11).trim());
            }else if (line.contains("PCT")) {
                putToParams("PCT", line.substring(line.indexOf("PCT")+11,line.indexOf("PCT")+16).trim());
            }else if (line.contains("PDW")) {
                putToParams("PDW", line.substring(line.indexOf("PDW")+8,line.indexOf("PDW")+12).trim());
            }else if (line.contains("MPV")) {
                putToParams("MPV", line.substring(line.indexOf("MPV")+8,line.indexOf("MPV")+11).trim());
            }else if (line.contains("RDW-SD")) {
                putToParams("RDW-SD", line.substring(line.indexOf("RDW-SD")+11,line.indexOf("RDW-SD")+15).trim());
            }else if (line.contains("RDW-CV")) {
                putToParams("RDW-CV", line.substring(line.indexOf("RDW-CV")+11,line.indexOf("RDW-CV")+15).trim());
            }else if (line.contains("MCHC")) {
                putToParams("MCHC", line.substring(line.indexOf("MCHC")+9,line.indexOf("MCHC")+12).trim());
            }else if (line.contains("MCH")) {
                putToParams("MCH", line.substring(line.indexOf("MCH")+8,line.indexOf("MCH")+12).trim());
            }else if (line.contains("MCV")) {
                putToParams("MCV", line.substring(line.indexOf("MCV")+8,line.indexOf("MCV")+12).trim());
            }else if (line.contains("MON%")) {
                putToParams("MON%", line.substring(line.indexOf("MON%")+9,line.indexOf("MON%")+12).trim());
            }else if (line.contains("MON#")) {
                putToParams("MON#", line.substring(line.indexOf("MON#")+9,line.indexOf("MON#")+13).trim());
            }else if (line.contains("LYM%")) {
                putToParams("LYM%", line.substring(line.indexOf("LYM%")+9,line.indexOf("LYM%")+13).trim());
            }else if (line.contains("LYM#")) {
                putToParams("LYM#", line.substring(line.indexOf("LYM#")+9,line.indexOf("LYM#")+13).trim());
            }else if (line.contains("EOS%")) {
                putToParams("EOS%", line.substring(line.indexOf("EOS%")+9,line.indexOf("EOS%")+12).trim());
            }else if (line.contains("EOS#")) {
                putToParams("EOS#", line.substring(line.indexOf("EOS#")+9,line.indexOf("EOS#")+13).trim());
            }else if (line.contains("NEU#")) {
                putToParams("NEU#", line.substring(line.indexOf("NEU#")+9,line.indexOf("NEU#")+13).trim());
            }else if (line.contains("NEU%")) {
                putToParams("NEU%", line.substring(line.indexOf("NEU%")+9,line.indexOf("NEU%")+13).trim());
            }else if (line.contains("BAS%")) {
                putToParams("BAS%", line.substring(line.indexOf("BAS%")+9,line.indexOf("BAS%")+12).trim());
            }else if (line.contains("BAS#")) {
                putToParams("BAS#", line.substring(line.indexOf("BAS#")+9,line.indexOf("BAS#")+13).trim());
            }
        }

    } catch (UnknownHostException e) {
        System.out.println("Server not found: " + e.getMessage());
    } catch (IOException e) {
        System.out.println("I/O error: " + e.getMessage());
    } finally {
        params.keySet().forEach(k-> System.out.println(k + " = " + params.get(k)));
    }
    }
        private void initializeMap() {
        params.put("WBC", "");
        params.put("Nue#", "");
        params.put("Lym#", "");
        params.put("Mon#", "");
        params.put("Eos#", "");
        params.put("Bas#", "");
        params.put("Neu%", "");
        params.put("Lym%", "");
        params.put("Mon%", "");
        params.put("Eos%", "");
        params.put("Bas%", "");
        params.put("RBC", "");
        params.put("HGB", "");
        params.put("HCT", "");
        params.put("MCV", "");
        params.put("MCH", "");
        params.put("MCHC", "");
        params.put("RDW-CV", "");
        params.put("RDW-SD", "");
        params.put("PLT", "");
        params.put("MPV", "");
        params.put("PDW", "");
        params.put("PCT", "");
    }
    private void putToParams(String paramName, String paramValue) {
        if (StringUtils.isNotEmpty(paramValue)) {
            params.put(paramName, paramValue);
        }
    }

}
