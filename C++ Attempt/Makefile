output: encrypt.o primefunctions.o
	g++ encrypt.o primefunctions.o bignumber.o -o a 
	
main.o: encrypt.cpp
	g++ -c encrypt.cpp

message.o: primefunctions.cpp functions.h
	g++ -c primefunctions.cpp

number.o: bignumber.cpp bignumber.h
	g++ -c bignumber.cpp
clean: 
	rm *.o a

