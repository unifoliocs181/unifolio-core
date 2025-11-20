#ifndef LISTING_H
#define LISTING_H

#include <iostream>
#include <vector>
#include <string>
#include <sstream>

using namespace std:

class Listing {
    private:
        string title;
        string dateStart;
        string dateEnd;
        vector<string> details;
        string getTitle() {return title;}
        string getDates() {return dateStart + " - " + dateEnd;}
        void tab(ostringstream& out, int count);
    public:
        Listing(string, string, string, vector<string>);
        Listing(string, string, vector<string>);
        void outputListing(ostringstream& out);
};

#endif