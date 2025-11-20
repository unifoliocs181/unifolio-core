#include "Listing.h"

Listing::Listing(string title, string dateStart, string dateEnd, vector<string> details) 
: title(title), dateStart(dateStart), dateEnd(dateEnd), details(details) {}

Listing::Listing(string title, string dateStart, vector<string> details) 
: title(title), dateStart(dateStart), dateEnd("Present"), details(details) {}

void Listing::tab(ostringstream& out, int count) {
    for (unsigned i = 0; i < count; i++) {
        out << "\t";
    }
}

void Listing::outputListing(ostringstream& out) {
    tab(out, 1);
    out << "\\resumeSubheading\n";
    out << "{" << getTitle() << "}{" << getDates() << "}\n";
    tab(out, 2);
    out << "\\resumeItemListStart\n";
    for (unsigned i = 0; i < details.size(); i++) {
        tab(out, 3);
        out << "\\resumeItem{"+ details.at(i) + "}\n";
    }
    tab(out, 2);
    out << "\\resumeItemListEnd\n";
}