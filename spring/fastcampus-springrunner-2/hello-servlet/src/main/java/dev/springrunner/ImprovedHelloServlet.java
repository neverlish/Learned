package dev.springrunner;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet(urlPatterns = { "/improved-hello" })
public class ImprovedHelloServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String requestName = request.getParameter("name");
        String servletName = getServletConfig().getServletName();

        request.setAttribute("requestName", requestName);
        request.setAttribute("servletName", servletName);

        request.getRequestDispatcher("/improved-hello.jsp")
            .forward(request, response);
    }

}