#include <iostream>
#include "functions.h"
#include <vector>
#include <string.h>
#include <math.h>
#include <iostream>
#include <chrono>
#include <random>
#include <assert.h>  

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

    evenPrime = simpleSubtract(evenPrime);

    while (mod(evenPrime,2) == 0) {
        evenPrime = vectorToString(multiply(evenPrime, to_string(1/2)));
        maxByTwo++;
    }

    string evenPrime2 = evenPrime;

    evenPrime2 = simpleSubtract(evenPrime2);

    assert(vectorToString(multiply(to_string(pow(2, maxByTwo)), evenPrime)) == evenPrime2);

    int numberOfTrials = 20;

    unsigned seed = chrono::system_clock::now().time_since_epoch().count();

    default_random_engine generator (seed);

    uniform_int_distribution<int> distribution(2,600);
    uniform_int_distribution<int> distribution1(1,9);
    uniform_int_distribution<int> distribution2(0,9);

    for (int i = 0; i < numberOfTrials; i++) {
        string roundTester;
        int length = distribution(generator);
        roundTester += to_string(distribution1(generator));
        for (int i = 0; i < length; i++) {
            roundTester += to_string(distribution2(generator));
        }
        bool trueFalse = true;
        string powerRes = toPower(roundTester, evenPrime);
        if (stoi(modulus(powerRes, num)) == 1) {
            trueFalse = false;
        }
        if (trueFalse == true) {
            string counter = "0";
            while(isLess(counter, to_string(maxByTwo))) {
                string twoiec = vectorToString(multiply(toPower(to_string(2), counter), evenPrime2));
                string resultOfPow = toPower(roundTester, twoiec);
                ///if modulus()
            }
        }
    }

}

string vectorToString(vector<int> num) {
    string converted;

    for (int i = 0; i < num.size(); i++) {
        converted.append(to_string(num[i]));
    }

    return converted;
}

string toPower(string num1, string num2) {
    string result = num1;
    string counter = "0"; 
    ///string subtracted = simpleSubtract(num2);

    ///num1 = round_tester
    ///num2 = evenComponent
    while (isLess(counter, num2)) {
        result = vectorToString(multiply(result, num1));
        counter = simpleAdd(counter);
    }   

    return result;
}

string modulus(string num1, string num2) {
    vector<int> result = multiply(num1, num2);
    int truncate = result[0];
    vector<int> secondnum = multiply(num2, to_string(truncate));
    string secondnumstr = vectorToString(secondnum);
    string final = findDiff(num1, secondnumstr);
    return final;
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

string simpleSubtract(string num) {
    if (num[num.length() - 1] != 0) {
        num[num.length() - 1] = num[num.length() - 1] - 1;
    } else {
        num.pop_back();
        num[num.length() - 1] = num[num.length() - 1] - 1;
    }
    return num;
}

bool isSmaller(string str1, string str2) {
    // Calculate lengths of both string
    int n1 = str1.length(), n2 = str2.length();
 
    if (n1 < n2)
        return true;
    if (n2 < n1)
        return false;
 
    for (int i = 0; i < n1; i++)
        if (str1[i] < str2[i])
            return true;
        else if (str1[i] > str2[i])
            return false;
 
    return false;
}

string findDiff(string str1, string str2) {
    // Before proceeding further, make sure str1
    // is not smaller
    if (isSmaller(str1, str2))
        swap(str1, str2);
 
    // Take an empty string for storing result
    string str = "";
 
    // Calculate length of both string
    int n1 = str1.length(), n2 = str2.length();
 
    // Reverse both of strings
    reverse(str1.begin(), str1.end());
    reverse(str2.begin(), str2.end());
 
    int carry = 0;
 
    // Run loop till small string length
    // and subtract digit of str1 to str2
    for (int i = 0; i < n2; i++) {
        // Do school mathematics, compute difference of
        // current digits
 
        int sub
            = ((str1[i] - '0') - (str2[i] - '0') - carry);
 
        // If subtraction is less then zero
        // we add then we add 10 into sub and
        // take carry as 1 for calculating next step
        if (sub < 0) {
            sub = sub + 10;
            carry = 1;
        }
        else
            carry = 0;
 
        str.push_back(sub + '0');
    }
 
    // subtract remaining digits of larger number
    for (int i = n2; i < n1; i++) {
        int sub = ((str1[i] - '0') - carry);
 
        // if the sub value is -ve, then make it positive
        if (sub < 0) {
            sub = sub + 10;
            carry = 1;
        }
        else
            carry = 0;
 
        str.push_back(sub + '0');
    }
 
    // reverse resultant string
    reverse(str.begin(), str.end());
 
    return str;
}