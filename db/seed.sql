INSERT INTO organisations (user_id, org_name) VALUES (2, 'connective');
INSERT INTO organisations (user_id, org_name) VALUES (2, 'brandedfinancial'); 
INSERT INTO organisations (user_id, org_name) VALUES (2, 'nike') RETURNING (org_id); 



INSERT INTO contacts (id, name, org_name, last_contacted, most_recent_thread_ids, email) VALUES (2, 'Subash Chander', 8, 'Fri, 29 Jul 2022 05:33:23 +0000', '{"182487214867ea29", "182482abb9ada500", "18247be2970d15f7", "182443263947a33c", 
"18243fb5c788cc51"}', 'SChander@brandedfinancial.com');

INSERT INTO contacts (name, org_name, last_contacted, most_recent_thread_ids, email) VALUES ('Esther Kamien', 7, 'Mon, 01 Aug 2022 05:01:30 +0000','{"18257c7e04980256", "1824862f2fa167e2", "18241b5d6564d777"}', 'esther@connective.com.au');


SELECT (contacts.name, contacts.org_name, contacts.last_contacted, contacts.most_recent_thread_ids, contacts.email) FROM contacts FULL OUTER JOIN organisations ON organisations.org_id = contacts.org_name WHERE organisations.user_id = 2;

SELECT * FROM contacts FULL OUTER JOIN organisations ON organisations.org_id = contacts.org_name WHERE organisations.user_id = 2;

INSERT INTO contacts (name, org_name, last_contacted, most_recent_thread_ids, email) 
VALUES ('Subash Chander', 2, 'Fri, 30 Jul 2022 05:33:23 +0000', '{182487214867ea29,182482abb9ada500,18247be2970d15f7,182443263947a33c,18243fb5c788cc51}', 'SChander@brandedfinancial.com') 
ON CONFLICT (email) 
DO UPDATE SET (last_contacted, most_recent_thread_ids) = (EXCLUDED.last_contacted, EXCLUDED.most_recent_thread_ids);