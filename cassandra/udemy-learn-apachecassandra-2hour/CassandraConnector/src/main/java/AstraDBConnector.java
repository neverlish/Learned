import java.nio.file.Paths;
import java.util.Iterator;

import com.datastax.oss.driver.api.core.CqlSession;
import com.datastax.oss.driver.api.core.cql.ResultSet;
import com.datastax.oss.driver.api.core.cql.Row;


public class AstraDBConnector {

	public static void main(String[] args) {
		
	        CqlSession session = CqlSession.builder()
	           .withCloudSecureConnectBundle(Paths.get("D:/Softwares/secure-connect-sampleDB.zip"))
	           .withAuthCredentials("XwjGrzTvafEqBwxhnsPGpwii","63ao.vi,umLtN1dSIeKuiYvcoaUUW5e40NLehm2MmPd39cUzX_YbwEhamUaikMKwiDLQr-UoAPaSa-Rp+XKKlL.y8B5BaKulfaT+b_scsHTRmuN.pvSo3p3zp6DmjZTm")
	           .build();
	          
	           ResultSet rs = session.execute("select * from firstkeyspace.books_by_author");
	           printResult(rs);

	}
	
	public static void printResult(ResultSet rs) {		
		Iterator<Row> i = rs.iterator();
		while(i.hasNext()) {
			 Row row = i.next();
			 System.out.print(row.getString("author_name")  
					 			+ " | " 
					 			+row.getInt("publish_year")
					 			+" | "
					 			+row.getFloat("rating"));
			 System.out.println("");
			
			
		}
		
	}
	

}
