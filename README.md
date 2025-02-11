for check the email (not valid fake mail)

/^(?!.*(tempmail|fakemail|0815|mailinator|spam|guerrillamail|yopmail|disposable|inbox|mailcatch|mailnesia|mailtester|minuteinbox|trashmail|geemail|sharklasers|superrito|teleworm|throwawaymail|lookylooky|binkmail|maildrop|spambox|fastmail|mailbox|mohmal|jourrapin|fakemailgenerator|mailforspam)).+@([a-zA-Z0-9-.]+\.[a-zA-Z]{2,})/


//recomendation system amazon PDF link :- [recomendation system amazon PDF](https://library.ucsd.edu/dc/object/bb8503744c/_2_1.pdf)




# GRAPH Data Structure

- Two type of Edges Direction  : 1). Uni-Directional  2). Bi-Directional

- Two Types of Edges Weight : 1). Weighted 2). Un-Weighted





                projectOwner(H1)- primary Hauler
                /\        \
               H2 H7       C1 (Primary Contractor)
               /\           /\
             H3 H4         C2 C3
             /   \         /
            H5   H6       C4
            /
           H8

           - in this case H is Hauler & C is Contractor
           - when we get the clockin tickets of the H2 then we get the all childs tickets and get the creator name as primary child. for H2 primary childs are H3 and H4 and same for the all hauler level
           - in contractor primary contractor can see the H1 as a ticket creator but C2 and C3 see C1 as a ticker creator and C4 see the C3.

           - for this create a schema for the project sharing