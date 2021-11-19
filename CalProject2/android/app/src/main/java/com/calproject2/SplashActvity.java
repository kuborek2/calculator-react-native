package com.calproject2; // ← Make sure that is your package name

import android.content.Intent;
import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity; // ← For RN <= 0.59

import com.calproject2.MainActivity;

public class SplashActvity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);
        finish();
    }
}