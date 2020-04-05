package honux.calendar;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class PlanItem {
	public Date planDate;
	public String detail;
	public String peoples = "";
	
	public static Date getDateFromString(String strDate) {
		Date date = null;
		try {
			date = new SimpleDateFormat("yyyy-MM-DD").parse(strDate);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		
		return date;
	}
	
	public PlanItem(String date, String detail) {
		this.planDate = getDateFromString(date);
		this.detail = detail;
		
	}
	
	public Date getDate() {
		return planDate;
	}
	
	public void addPeople(String name) {
		peoples += name + ",";
	}
}
