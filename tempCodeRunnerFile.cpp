#include <iostream>
#include <math.h>
#include <time.h>
#include <vector>
#include <algorithm>
#include<string.h>
#include "functions.h"

using namespace std;

int main() {

    string num = "26739479328473897112825471612627166544616581503123456";
    int modby = 5;

    int result = 0;

    for (int i = 0; i < num.length(); i++) {
        result = (result*10 + (int)num[i] - '0') % modby;
    }

    cout << result;

}
        