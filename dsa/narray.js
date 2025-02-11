 
 // JavaScript implementation of the approach 
 // Class for the node of the tree 
 class Node 
 { 
 
     constructor(n, data)
     {
         this.data = data;
         this.children = Array(n);
     }
 } 
 // Function to print the inorder traversal 
 // of the n-ary tree 
 function inorder(node) 
 { 
     if (node == null) 
         return; 
     // Total children count 
     var total = node.children.length; 
     
     // All the children except the last 
     for (var i = 0; i < total; i++) 
         inorder(node.children[i]); 
     // Print the current node's data 
     console.log("" + node.data + " "); 
     // Last child 
    //  inorder(node.children[total - 1]); 
 } 
 
 // Driver code 
    /* Create the following tree 
                    1
                 /  |  \
                2   3   4
              / | \
             5  6  7
         */
 var n = 3; 
 var root = new Node(n, 1); 
 root.children[0] = new Node(n, 2); 
 root.children[1] = new Node(n, 3); 
 root.children[2] = new Node(n, 4); 
 root.children[0].children[0] = new Node(n, 5); 
 root.children[0].children[1] = new Node(n, 6); 
 root.children[0].children[2] = new Node(n, 7); 
 inorder(root); 