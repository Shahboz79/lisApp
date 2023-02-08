//package com.lissoft.test;
//
//import jssc.SerialPort;
//import jssc.SerialPortEvent;
//import jssc.SerialPortException;
//import jssc.SerialPortList;
//import org.apache.commons.lang3.StringUtils;
//import org.springframework.stereotype.Component;
//
//import java.nio.charset.StandardCharsets;
//import java.util.HashMap;
//import java.util.Map;
//
//@Component
//public class ComPort {
//    private SerialPort serialPort;
//    private String portName;
//    private Integer baudRate;
//    private static final int TIME_OUT = 2000;
//    private static final int DATA_RATE = 9600;
//
//    private static final Map<String, String> params = new HashMap<>();
//
//    public ComPort() throws SerialPortException {
//        this.portName = "COM3";
//        this.baudRate = 9600;
//        initialize();
//
//        serialPort.addEventListener(this::serialEvent);
//    }
//
//    private void initializeMap() {
//        params.put("No.", "");
//        params.put("ID", "");
//        params.put("UBG", "");
//        params.put("BIL", "");
//        params.put("KET", "");
//        params.put("CRE", "");
//        params.put("BLD", "");
//        params.put("PRO", "");
//        params.put("ALB", "");
//        params.put("NIT", "");
//        params.put("LEU", "");
//        params.put("GLU", "");
//        params.put("SG", "");
//        params.put("pH", "");
//        params.put("VC", "");
//        params.put("A:C", "");
//    }
//    public void initialize() {
//        String[] portNames = SerialPortList.getPortNames();
//
//        for (String port : portNames) {
//            if (port.equals(portName)) {
//                serialPort = new SerialPort(port);
//                break;
//            }
//        }
//        if (serialPort == null) {
//            System.out.println("Could not find COM port.");
//            return;
//        }
//
//        try {
//            serialPort.openPort();
//            serialPort.setParams(baudRate != null ? baudRate : DATA_RATE,
//                    SerialPort.DATABITS_8,
//                    SerialPort.STOPBITS_1,
//                    SerialPort.PARITY_NONE);
//
//        } catch (Exception e) {
//            System.err.println(e.toString());
//        }
//        initializeMap();
//    }
//
//    public SerialPort getSerialPort() {
//        return serialPort;
//    }
//
//    public synchronized void close() {
//        if (serialPort != null) {
//            try {
//                serialPort.removeEventListener();
//                serialPort.closePort();
//            } catch (SerialPortException e) {
//                throw new RuntimeException(e);
//            }
//        }
//    }
//
//    private synchronized void serialEvent(SerialPortEvent oEvent) {
//        if (oEvent.isRXCHAR()) {
//            try {
//                String inputLine = serialPort.readString();
//                if (inputLine != null && !inputLine.trim().isEmpty()) {
//                    if (StringUtils.isNotEmpty(inputLine.trim())) {
//                        String[] split = inputLine.split("\r\n");
//                        for (String line: split) {
//                            line = line.trim();
//                            if (line.startsWith("No.")) {
//                                putToParams("No.", line.substring(3).trim());
//                            } else if (line.startsWith("ID")) {
//                                putToParams("ID", line.substring(2).trim());
//                            } else if (line.startsWith("UBG")) {
//                                putToParams("UBG", line.substring(3).trim());
//                            } else if (line.startsWith("BIL")) {
//                                putToParams("BIL", line.substring(3).trim());
//                            } else if (line.startsWith("KET")) {
//                                putToParams("KET", line.substring(3).trim());
//                            } else if (line.startsWith("CRE")) {
//                                putToParams("CRE", line.substring(3).trim());
//                            } else if (line.startsWith("BLD")) {
//                                putToParams("BLD", line.substring(3).trim());
//                            } else if (line.startsWith("PRO")) {
//                                putToParams("PRO", line.substring(3).trim());
//                            } else if (line.startsWith("ALB")) {
//                                putToParams("ALB", line.substring(3).trim());
//                            } else if (line.startsWith("NIT")) {
//                                putToParams("NIT", line.substring(3).trim());
//                            } else if (line.startsWith("LEU")) {
//                                putToParams("LEU", line.substring(3).trim());
//                            } else if (line.startsWith("GLU")) {
//                                putToParams("GLU", line.substring(3).trim());
//                            } else if (line.startsWith("SG")) {
//                                putToParams("SG", line.substring(2).trim());
//                            } else if (line.startsWith("pH")) {
//                                putToParams("pH", line.substring(2).trim());
//                            } else if (line.startsWith("VC")) {
//                                putToParams("VC", line.substring(2).trim());
//                            } else if (line.startsWith("A:C")) {
//                                putToParams("A:C", line.substring(3).trim());
//                            }
//                        }
//                    }
//                }
//            } catch (Exception e) {
//                e.printStackTrace();
//            } finally {
//                params.keySet().forEach(k-> System.out.println(k + " = " + params.get(k)));
//            }
//
//        }
//    }
//
//    private void putToParams(String paramName, String paramValue) {
//        if (StringUtils.isNotEmpty(paramValue)) {
//            params.put(paramName, paramValue);
//        }
//    }
//
//    private String getValue(String value) {
//        String[] s = value.split(" ");
//        if (s.length > 1) {
//            return s[1];
//        }
//        return "";
//    }
//}