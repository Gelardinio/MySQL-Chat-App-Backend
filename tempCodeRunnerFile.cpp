#include <iostream>
#include <math.h>
#include <time.h>
#include <vector>
#include <algorithm>
#include <string.h>
#include "functions.h"
#include <string>
#include <stdlib.h>

using namespace std;

string simpleAdd(string num, int index);

int main() {
    string boi = "9799";
    boi = simpleAdd(boi, 1);
    cout << boi;

}
        
string simpleAdd(string num, int index) {
    /// Where the index is the offset from num.length()
    if (num[num.length() - index] != '9') {
        num[num.length() - index] = num[num.length() - index] + 1;
        return num;
    } else if (index == num.length()) {
        string temp;
        temp = temp + '1';
        for (int i = 0; i < num.length(); i++) {
            temp = temp + '0';
        }
        return temp;
    } else if (num[num.length() - index] == '9') {
        num[num.length() - index] = '0';
        return simpleAdd(num, index + 1);
    }
}