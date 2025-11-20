#ifndef RESUME_H
#define RESUME_H

#include <iostream>
#include <vector>
#include <string>

#include "Header.h"
#include "SkillType.h"
#include "Section.h"

using namespace std:

class Resume {
    private:
        vector<Section> sections;
        Header header;
        vector<SkillType> skills;
    public:
};

#endif