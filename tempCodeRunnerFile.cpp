#include <iostream>
#include <math.h>
#include <time.h>
#include <vector>
#include <algorithm>
#include <string.h>
#include "functions.h"

using namespace std;

string simpleSubtract(string num);

int main() {

    string boi = "28340239489030";
    boi = simpleSubtract(boi);
    ///cout << boi;

}
        
string simpleSubtract(string num) {
    if (num[num.length() - 1] != 0) {
        num[num.length() - 1] = num[num.length() - 1] - 1;
        ///cout << num << endl;
    } else {
        num.pop_back();
        cout << num << "boi" << endl;
        ///num[num.length() - 1] = num[num.length() - 1] - 1;
    }
    return num;
}