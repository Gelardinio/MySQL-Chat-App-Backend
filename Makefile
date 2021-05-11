output: encrypt.o primefunctions.o
	g++ encrypt.o primefunctions.o -o a

main.o: encrypt.cpp
	g++ -c encrypt.cpp

message.o: primefunctions.cpp functions.h
	g++ -c primefunctions.cpp

clean: 
	rm *.o a

