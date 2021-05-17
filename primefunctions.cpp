#include <iostream>
#include "functions.h"
#include <vector>
#include <string.h>
#include <math.h>
#include <iostream>
#include <chrono>
#include <random>

using namespace std;

vector<int> multiply(string num1, string num2) {
    int l1 = num1.length();
    int l2 = num2.length();
    vector<int> result(l1 + l2, 0);
    int product = 1;
    
    for(int i = l1-1; i >=0 ; i--)
    {
        for(int j = l2-1; j >=0; j--)
        {
            product = (num1[i] - '0') * (num2[j] - '0');
            
            result[i+j+1] += product;
            //carry
            result[i+j] += result[i+j+1] /10;
            result[i+j+1] %= 10;                
        }
    }
    return result;
}

string genNum() {
    string num;

    short choose;

    unsigned seed = chrono::system_clock::now().time_since_epoch().count();
    default_random_engine generator (seed);

    uniform_int_distribution<int> distribution(0,9);
    uniform_int_distribution<int> distribution4(0,1);

    choose = distribution4(generator);

    if (choose == 0) {   
        uniform_int_distribution<int> distribution2(8,9);
        uniform_int_distribution<int> distribution3(5,9);

        for(int i = 0; i < 4; i++) {
           num += to_string(distribution2(generator));
        }

        num += to_string(distribution3(generator));
        
        for (int i = 0; i < 303; i++) {
            num += to_string(distribution(generator));
        }
    } else {
        uniform_int_distribution<int> distribution5(0,7);
        uniform_int_distribution<int> distribution6(0,8);
        num += '1';
        num += to_string(distribution5(generator));
        num += to_string(distribution6(generator));

        for (int i = 0; i < 306; i++) {
            num += to_string(distribution(generator));
        }
    }

    return num;
}

int mod(string num, int modby) {
    int result = 0;

    for (int i = 0; i < num.length(); i++) {
        result = (result*10 + (int)num[i] - '0') % modby;
    }

    return result;
}

bool isLess(string num1, string num2) {

    if (num1.length() < num2.length()) {
        return true;
    } else if (num2.length() < num1.length()) {
        return false;
    }

    for (int i = 0; i < num1.length(); i++) {
        if ((int)num1[i] - '0' < (int)num2[i] - '0') {
            return true;
        } else if ((int)num1[i] - '0' > (int)num2[i] - '0') {
            return false;
        }
    }

    return true; 
}

string lowLevelPrime() {

    bool isPass = false;

    vector<int> firstPrimes = {2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349};

    while (isPass == false) {

        string possiblePrime = genNum();

        ///cout << possiblePrime << "boi" << endl;

        for (int i = 0; i < firstPrimes.size(); i++) {
            if (mod(possiblePrime, firstPrimes[i]) == 0 && isLess(to_string(pow(firstPrimes[i],2)), possiblePrime)) {
                cout << "meh";
                break;
            } else {
                cout << "trues";
                return possiblePrime;
            }
        }
    }
}

bool MilerRabinTest(string num) {

    int maxByTwo = 0;

    string evenPrime = num;

    evenPrime[evenPrime.length() - 1] = evenPrime[evenPrime.length() - 1] - 1;

    while (mod(evenPrime,2) == 0) {
        evenPrime = multiply(evenPrime, to_string(1/2));
    }

}