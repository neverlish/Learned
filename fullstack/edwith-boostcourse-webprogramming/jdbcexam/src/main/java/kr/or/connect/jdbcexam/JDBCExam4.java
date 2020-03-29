package kr.or.connect.jdbcexam;

import kr.or.connect.jdbcexam.dao.RoleDao;
import kr.or.connect.jdbcexam.dto.Role;

public class JDBCExam4 {

	public static void main(String[] args) {
		int roleId = 500;
		
		RoleDao dao = new RoleDao();
		
		int deleteCount = dao.deleteRole(roleId);
		
		System.out.println(deleteCount);
	}

}
