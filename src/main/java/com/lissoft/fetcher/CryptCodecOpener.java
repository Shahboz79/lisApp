package com.lissoft.fetcher;

import com.healthmarketscience.jackcess.Database;
import com.healthmarketscience.jackcess.DatabaseBuilder;
import com.healthmarketscience.jackcess.crypt.CryptCodecProvider;
import net.ucanaccess.jdbc.JackcessOpenerInterface;

import java.io.File;
import java.io.IOException;

public class CryptCodecOpener implements JackcessOpenerInterface {
    @Override
    public Database open(File fl, String pwd) throws IOException {
        DatabaseBuilder dbd =new DatabaseBuilder(fl);
        dbd.setAutoSync(false);
        dbd.setCodecProvider(new CryptCodecProvider(pwd));
        dbd.setReadOnly(false);
        return dbd.open();
    }
}
