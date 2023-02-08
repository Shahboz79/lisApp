package com.lissoft.test;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.ServerSocket;
import java.net.Socket;
import java.nio.charset.StandardCharsets;

public class SimpleTCPEchoServer {
    private static final int BUFFER_SIZE = 200;

    public static void main(String[] args) throws IOException {
//
//        ServerSocket serverSocket = new ServerSocket(1080);
//
//        int receivedMessageSize;
//        byte[] receivedByeBuffer = new byte[BUFFER_SIZE];
//
//        while (true) {
//            Socket clientSocket = serverSocket.accept();     // Get client connection
//
//            System.out.println("Handling client at " +
//                    clientSocket.getInetAddress().getHostAddress() + " through port " +
//                    clientSocket.getPort());
//
//            InputStream in = clientSocket.getInputStream();
//
//            receivedMessageSize = in.read(receivedByeBuffer);
//            System.out.println(new String(receivedByeBuffer, StandardCharsets.UTF_8));
//            System.out.println("Packet size: " + receivedMessageSize);
//            clientSocket.close();  // 1Close the socket.  We are done serving this client
//        }
        BC5000Listener bc5000Listener=new BC5000Listener();
        bc5000Listener.initialize();

    }
}
