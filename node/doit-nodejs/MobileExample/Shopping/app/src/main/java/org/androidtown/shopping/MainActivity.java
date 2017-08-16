package org.androidtown.shopping;

import android.content.Context;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.support.v7.app.AppCompatActivity;
import android.telephony.TelephonyManager;
import android.util.DisplayMetrics;
import android.view.View;
import android.view.WindowManager;
import android.widget.EditText;
import android.widget.TextView;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import java.util.HashMap;
import java.util.Map;

public class MainActivity extends AppCompatActivity {

    EditText editText;
    TextView textView;
    EditText editText2;

    Handler handler = new Handler();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        editText = (EditText) findViewById(R.id.editText);
        textView = (TextView) findViewById(R.id.textView);
        editText2 = (EditText) findViewById(R.id.editText2);
    }

    public void onButton1Clicked(View v) {
        String url = editText.getText().toString();

        StringRequest request = new StringRequest(Request.Method.POST, url,
            new Response.Listener<String>() {
                @Override
                public void onResponse(String response) {
                    try {
                        println("onResponse() 호출됨 : " + response);
                    } catch(Exception e) {
                        e.printStackTrace();
                    }
                }
            },
            new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    error.printStackTrace();
                }
            }
        ) {
            @Override
            protected Map<String, String> getParams() {
                Map<String, String> params = new HashMap<>();

                return params;
            }
        };

        Volley.newRequestQueue(this).add(request);
        println("웹서버에 요청함 : " + url);
    }

    public void onButton2Clicked(View v) {
        String url = editText2.getText().toString();

        StringRequest request = new StringRequest(Request.Method.POST, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        try {
                            println("onResponse() 호출됨 : " + response);
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        error.printStackTrace();
                    }
                }
        ) {
            @Override
            protected Map<String, String> getParams() {
                Map<String, String>  params = new HashMap<>();

                DeviceInfo device = getDeviceInfo();
                params.put("mobile", device.getMobile());
                params.put("osVersion", device.getOsVersion());
                params.put("model", device.getModel());
                params.put("display", device.getDisplay());
                params.put("manufacturer", device.getManufacturer());
                params.put("macAddress", device.getMacAddress());

                return params;
            }
        };

        Volley.newRequestQueue(this).add(request);
        println("웹서버에 요청함 : " + url);

    }

    public void println(final String data) {
        handler.post(new Runnable() {
            @Override
            public void run() {
                textView.append(data + '\n');
            }
        });
    }

    public DeviceInfo getDeviceInfo() {
        DeviceInfo device = null;

        // 1. mobile
        String mobile = null;
        TelephonyManager telephonyManager = (TelephonyManager) getSystemService(Context.TELEPHONY_SERVICE);
        if ( telephonyManager.getLine1Number() != null ) {
            mobile = telephonyManager.getLine1Number();
        }

        // 2. osVersion
        String osVersion = Build.VERSION.RELEASE;

        // 3. model
        String model = Build.MODEL;

        // 4. display
        String display = getDisplay(this);

        // 5. manufacturer
        String manufacturer = Build.MANUFACTURER;

        // 6. macAddress
        String macAddress = getMacAddress(this);

        device = new DeviceInfo(mobile, osVersion, model, display, manufacturer, macAddress);

        return device;
    }

    private static String getDisplay(Context context) {
        DisplayMetrics displayMetrics = new DisplayMetrics();
        WindowManager windowManager = (WindowManager) context.getSystemService(Context.WINDOW_SERVICE);
        windowManager.getDefaultDisplay().getMetrics(displayMetrics);
        int deviceWidth = displayMetrics.widthPixels;
        int deviceHeight = displayMetrics.heightPixels;

        return deviceWidth + "x" + deviceHeight;
    }

    private static String getMacAddress(Context context) {
        WifiManager wifiManager = (WifiManager) context.getSystemService(Context.WIFI_SERVICE);
        WifiInfo info = wifiManager.getConnectionInfo();

        return info.getMacAddress();
    }
}
