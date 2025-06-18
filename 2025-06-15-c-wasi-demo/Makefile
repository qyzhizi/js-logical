WASI_SDK_PATH = /opt/wasi-sdk
SYS_ROOT = $(WASI_SDK_PATH)/share/wasi-sysroot
CXX = $(WASI_SDK_PATH)/bin/clang --sysroot=$(SYS_ROOT)

build_wasm:
	@mkdir -p build
	$(CXX)  write_file.c -o build/write_file.wasm