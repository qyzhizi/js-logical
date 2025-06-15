#include <stdio.h>

int main() {
    const char *filename = "/output.txt";
    printf("Trying to open file: %s\n", filename);

    FILE *fp = fopen(filename, "w");
    if (fp == NULL) {
        perror("Failed to open file");
        return 1;
    }

    fprintf(fp, "Hello, WASI!\n");
    fclose(fp);

    printf("File write successful.\n");
    return 0;
}
