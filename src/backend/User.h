#ifndef USER_H
#define USER_H

#include <iostream>
#include <vector>
#include <string>

#include "Resume.h"

using namespace std:

class User {
    private:
        string fullName;
        string email;
        string password;
        bool agreeToTerms;
        string userID;
        string userAcct;
        string githubAcct;
        Resume resume;
    public:
        string getName();
        string getEmail();
        string getResume();
};

#endif