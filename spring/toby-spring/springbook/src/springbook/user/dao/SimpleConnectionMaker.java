package springbook.user.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class SimpleConnectionMaker {
    public Connection makeNewConnection() throws SQLException {
        Connection c = DriverManager.getConnection(
                "jdbc:mysql://localhost/springbook", "root", ""
        );
        return c;
    }
}
