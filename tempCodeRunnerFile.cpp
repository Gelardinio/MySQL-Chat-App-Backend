#include <iostream>
#include <math.h>
#include <time.h>
#include <vector>
#include <algorithm>
#include <string.h>
#include "functions.h"

using namespace std;

string global;

string simpleAdd(string num, int index);

int main() {
    string boi = "28340239489099";
    boi = simpleAdd(boi, 1);
    cout << "boi";
    cout << global;

}
        
string simpleAdd(string num, int index) {
    /// Where the index is the offset from num.length()
    if (num[num.length() - index] != '9') {
        num[num.length() - index] = num[num.length() - index] + 1;
        string temp = num;
        cout << endl << temp << endl;
        global = temp;
        cout << global << endl;
        return temp;
    } else {
        num[num.length() - index] = '0';
        cout << num << endl;
        simpleAdd(num, index + 1);
    }
}