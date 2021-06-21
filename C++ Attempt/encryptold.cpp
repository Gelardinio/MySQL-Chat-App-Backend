#include <iostream>
#include <math.h>
#include <time.h>
#include <vector>
#include <algorithm>
#include <bits/stdc++.h>

using namespace std;

vector<int> adder(vector<int> first, vector<int> second, int offset);

vector<int> adder(vector<int> first, vector<int> second, int offset) {
    vector<int> result;
    float carry = 0;
    float val = 0;
    float results = 0;

    for (int i = 0; i < offset; i++) {
        result.push_back(first[first.size() - 1 - i]);
    }   

    for (int i = 0; i < first.size() - offset; i++) {
        val = second[second.size() - i - 1] + first[first.size() - 1 - i - offset] + carry;
        result.push_back(((int(val)) % 10));
        if (val > 9) {
            carry = val / pow(10, log10(val));
        } else {
            carry = 0;
        }
    }

    for (int i = second.size() - (first.size() - offset) - 1; i>=0; i--) {
        results = second[i] + carry;
        if (i == 0) {
            result.push_back(results);
            break;
        }
        if (results > 9) {
            carry = results / pow(10, log10(results));
            result.push_back(int(results) % 10);
        } else {
            result.push_back(results);
            carry = 0;
        }
    }

    reverse(result.begin(), result.end());
    for (int i = 0; i < result.size(); i++) {
        cout << result[i];
    }
}

int main() {

    const int sizer = 2;

    srand((unsigned) time(0));

    int prime1[sizer];
    int prime2[sizer];
    int out[sizer + 1];
    int carry = 0;
    int number1 = 0;
    int number2 = 0;
    vector <int>no1;
    vector <int>no3;
    vector <int>no2 (1, 0);
    int k = 0;
    int product = 0;
    int one = 0;
    int two = 0;

    for (int i = 0; i < sizer; i++) {
        prime1[i] = 4;
        prime2[i] = 4;
    }

    int i = sizer - 1;

    while (i >= 1) {
        for (int j = sizer - 1; j >= 0; j--) {
            product = (prime1[j] * prime2[i]) + carry;
            //second digit
            if (j > 0) {
                no1.push_back(((product) % 10));
            } else {
                no1.push_back(product);
            }
            //carry digit (frst digit if existent)
            if (product > 9) {
                carry = (product) / pow(10, log10(product));
            } else {
                carry = 0;
            }
        }
        --i;
        carry = 0;

        if (no1[no1.size() - 1] > 9) {
            one = (no1[no1.size() - 1]) / pow(10, log10(no1[no1.size() - 1]));
            two = (no1[no1.size() - 1] % 10);
            no1.pop_back();
            no1.push_back(two);
            no1.push_back(one);
        }

        reverse(no1.begin(), no1.end());

        no3 = adder(no1,no1,1);
    }
}