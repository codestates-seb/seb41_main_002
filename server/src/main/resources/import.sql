-- MEMBER
INSERT INTO MEMBER VALUES (1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'ID1', '111111', 'ID1@gmail.com', 0, 'USER1', 'password1', '010-111-1111');
INSERT INTO MEMBER VALUES (2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'ID2', '111112', 'ID2@gmail.com', 0, 'USER2', 'password2', '010-111-1112');
INSERT INTO MEMBER VALUES (3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'ID3', '111113', 'ID3@gmail.com', 0, 'USER3', 'password3', '010-111-1113');
INSERT INTO MEMBER VALUES (4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'ID4', '111114', 'ID4@gmail.com', 0, 'USER4', 'password4', '010-11-1114');
INSERT INTO MEMBER VALUES (5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'ID5', '111115', 'ID5@gmail.com', 0, 'USER5', 'password5', '010-111-1115');

-- ADDRESS
INSERT INTO ADDRESS VALUES (1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'address1', 'addressTitle1', true, 'zipcode1', 1);
INSERT INTO ADDRESS VALUES (2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'address2', 'addressTitle2', false, 'zipcode2', 1);
INSERT INTO ADDRESS VALUES (3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'address3', 'addressTitle3', false, 'zipcode3', 1);
INSERT INTO ADDRESS VALUES (4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'address4', 'addressTitle4', true, 'zipcode4', 2);
INSERT INTO ADDRESS VALUES (5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'address5', 'addressTitle5', false, 'zipcode5', 2);
INSERT INTO ADDRESS VALUES (6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'address6', 'addressTitle6', false, 'zipcode6', 2);
INSERT INTO ADDRESS VALUES (7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'address7', 'addressTitle7', true, 'zipcode7', 3);
INSERT INTO ADDRESS VALUES (8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'address8', 'addressTitle8', false, 'zipcode8', 3);
INSERT INTO ADDRESS VALUES (9, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'address9', 'addressTitle9', false, 'zipcode9', 3);

-- SUBSCRIBE
INSERT INTO SUBSCRIBE VALUES (1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, 0, 0, CURRENT_TIMESTAMP, 0, 1)

-- ITEM
INSERT INTO ITEM VALUES(1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'toner1', '토너1', 'contentvalue1', 'cotentimageurl1.png', 'itemtitle1', 20000, 3.5, 51,'titleImageUrl1.png');
INSERT INTO ITEM VALUES(2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'toner2', '토너2', 'contentvalue2', 'cotentimageurl2.png', 'itemtitle2', 20000, 5.0, 192,'titleImageUrl2.png');
INSERT INTO ITEM VALUES(3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'toner3', '토너3', 'contentvalue3', 'cotentimageurl3.png', 'itemtitle3', 20000, 4.5, 85,'titleImageUrl3.png');
INSERT INTO ITEM VALUES(4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'toner4', '토너4', 'contentvalue4', 'cotentimageurl4.png', 'itemtitle4', 20000, 2.5, 23,'titleImageUrl4.png');
INSERT INTO ITEM VALUES(5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'toner5', '토너5', 'contentvalue5', 'cotentimageurl5.png', 'itemtitle5', 20000, 4.0, 78,'titleImageUrl5.png');
INSERT INTO ITEM VALUES(6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'toner6', '토너6', 'contentvalue6', 'cotentimageurl6.png', 'itemtitle6', 20000, 3.5, 24,'titleImageUrl6.png');
INSERT INTO ITEM VALUES(7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'toner7', '토너7', 'contentvalue7', 'cotentimageurl7.png', 'itemtitle7', 20000, 4.5, 63,'titleImageUrl7.png');
INSERT INTO ITEM VALUES(8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'toner8', '토너8', 'contentvalue8', 'cotentimageurl8.png', 'itemtitle8', 20000, 3.0, 58,'titleImageUrl8.png');
INSERT INTO ITEM VALUES(9, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'toner9', '토너9', 'contentvalue9', 'cotentimageurl9.png', 'itemtitle9', 20000, 5.0, 291,'titleImageUrl9.png');
INSERT INTO ITEM VALUES(10, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'toner10', '토너10', 'contentvalue10', 'cotentimageurl10.png', 'itemtitle10', 20000, 4.0, 47,'titleImageUrl10.png');


-- BANNER_IMAGE
INSERT INTO BANNER_IMAGE VALUES (1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'stubBannerImage.png')

-- EVENT
INSERT INTO EVENT VALUES (1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'StubContent1', 'stubEventImage1.png', 'EVENT_PROGRESS', 'stubTitle1')
INSERT INTO EVENT VALUES (2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'StubContent2', 'stubEventImage2.png', 'EVENT_PROGRESS', 'stubTitle2')
INSERT INTO EVENT VALUES (3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'StubContent3', 'stubEventImage3.png', 'EVENT_PROGRESS','stubTitle3')
INSERT INTO EVENT VALUES (4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'StubContent4', 'stubEventImage4.png', 'EVENT_ENDED', 'stubTitle4')git
INSERT INTO EVENT VALUES (5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'StubContent5', 'stubEventImage5.png', 'EVENT_PROGRESS', 'stubTitle5')
