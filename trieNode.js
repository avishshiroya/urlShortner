// class TrieNode {
//     constructor() {
//         this.children = {};
//         this.isEndOfWord = false;
//     }
// }
// class Trie {
//     constructor() {
//         this.root = new TrieNode();
//     }
//     insert(word) {
//         let currentNode = this.root;
//         for (let i = 0; i < word.length; i++) {
//             const char = word[i];
//             if (!currentNode.children[char]) {
//                 currentNode.children[char] = new TrieNode();
//             }
//             currentNode = currentNode.children[char];
//         }
//         currentNode.isEndOfWord = true;
//     }
//     search(word) {
//         let currentNode = this.root;
//         for (let i = 0; i < word.length; i++) {
//             const char = word[i];
//             if (!currentNode.children[char]) {
//                 return false;
//             }
//             currentNode = currentNode.children[char]
//         }
//         return currentNode.isEndOfWord;
//     }
// }
// var sumPrefixScores = function (words, search) {
//     const trie = new Trie();
//     for (let i = 0; i < words.length; i++) {
//         trie.insert(words[i])
//     }
//     return trie.search(search);
// };

// console.log(sumPrefixScores(["abc","ab","bc","b"]));


class TrieNode {
    constructor() {
        this.children = Array(26);
        this.count = 0;
    }
}
class Trie {
    constructor() {
        this.root = new TrieNode();
    }
    insert(word) {
        let currentNode = this.root;
        for (const c of word) {
            const idx = c.charCodeAt(0) - 'a'.charCodeAt(0)
            if (!currentNode.children[idx]) {
                currentNode.children[idx] = new TrieNode();
            }
            currentNode = currentNode.children[idx];
            currentNode.count++;
        }
    }
    search(word) {
        let currentNode = this.root;
        let ans = 0;
        for (const c of word) {
            const idx = c.charCodeAt(0) - 'a'.charCodeAt(0)
            if (!currentNode.children[idx]) {
                return ans;
            }
            currentNode = currentNode.children[idx];
            ans += currentNode.count
        }
        return ans;
    }
}
var sumPrefixScores = function (words) {
    const trie = new Trie();
    let ans = [];
    for (const w of words) {
        trie.insert(w)
    }
    for (const w of words) {
        ans.push(trie.search(w))
    }
    return ans;
};

console.log(sumPrefixScores(["abc", "ab", "bc", "b"]));
