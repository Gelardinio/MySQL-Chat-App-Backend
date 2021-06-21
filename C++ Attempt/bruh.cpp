#include <iostream>
#include <math.h>
#include <time.h>
#include <vector>
#include <algorithm>
#include <bits/stdc++.h>

using namespace std;

int main() {

    vector<int> first{1,7,6};
    vector<int> second{1,7,6};
    int offset = 1;

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

    cout << carry << endl;

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