#include <iostream>
#include <math.h>
#include <time.h>
#include <vector>
#include <algorithm>
#include<string.h>
#include "functions.h"

using namespace std;

int main() {

    int boi = 102;
    string bois = "102";
    vector<int> bruh;

    boi >>= 1;

    bruh = multiply(bois, to_string(4));
    
    cout << boi;
    for (int i = 0; i < bruh.size(); i++) {
        cout << bruh[i];
    }
}
        