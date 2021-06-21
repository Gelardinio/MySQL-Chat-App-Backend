#include <iostream>
#include <math.h>
#include <time.h>
#include <vector>
#include <algorithm>
#include <string.h>
#include "functions.h"
#include <string>
#include <stdlib.h>
#include "bignumber.h"
#ifdef NDEBUG
#undef NDEBUG
#endif
#include <assert.h>

using namespace std;

int main() {

    while (true) {
        string prime = lowLevelPrime();

        if (MilerRabinTest(prime) == false) {
            continue;
        } else {
            cout << prime;
            break;
        }
    }

}
