#include <stdio.h>

int main() {
    printf("File written to do.\n");
    FILE *fp = fopen("data/hello_world_file.txt", "w");

    if (fp == NULL) {
        perror("Failed to open file");
        return 1;
    }

    fprintf(fp, "Hello, WASM world!\n");
    fclose(fp);

    printf("File written successfully.\n");
    return 0;
}