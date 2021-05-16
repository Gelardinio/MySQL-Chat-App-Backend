#include <iostream>
#include <math.h>
#include <time.h>
#include <vector>
#include <algorithm>
#include<string.h>
#include "functions.h"

using namespace std;

int main() {

    srand (time(NULL));

    string num1;
    string num2;
    vector<int> num3;
    string num4;

    num1 = genNum();
    num2 = genNum();
    
    num3 = multiply(num1, num2);

  ///  for (int i = 0; i < num3.size(); i++) {
     ///   cout << num3[i];
   /// }

    num4 = lowLevelPrime();

    for (int i = 0; i < num4.length(); i++) {
      cout << num4[i];
    }
   /// cout << num4;
}
