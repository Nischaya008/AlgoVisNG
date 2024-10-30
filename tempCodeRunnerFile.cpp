#include <iostream>
#include <sstream>
#include <string>
#include <vector>
#include <unordered_map>
#include <algorithm>
using namespace std;
vector<string> dictWords(string textInput) {
    vector<string> answer;
    unordered_map<string, int> wordCount;
    string word;
    stringstream ss(textInput);

    // Tokenizing the input text and counting word occurrences
    while (ss >> word) {
        wordCount[word]++;
    }

    // Collecting words that appear more than once
    for (const auto &entry : wordCount) {
        if (entry.second > 1) {
            answer.push_back(entry.first);
        }
    }

    // Sorting the repeated words lexicographically
    sort(answer.begin(), answer.end());

    // If no repeated words, return "NA"
    if (answer.empty()) {
        answer.push_back("NA");
    }

    return answer;
}

int main() {

vector<string> dictWords(string textInput) {
    vector<string> answer;
    unordered_map<string, int> wordCount;
    string word;
    stringstream ss(textInput);

    // Tokenizing the input text and counting word occurrences
    while (ss >> word) {
        wordCount[word]++;
    }

    // Collecting words that appear more than once
    for (const auto &entry : wordCount) {
        if (entry.second > 1) {
            answer.push_back(entry.first);
        }
    }

    // Sorting the repeated words lexicographically
    sort(answer.begin(), answer.end());

    // If no repeated words, return "NA"
    if (answer.empty()) {
        answer.push_back("NA");
    }

    return answer;
}

int main() {