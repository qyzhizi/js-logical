use proc_macro::TokenStream;
use quote::quote;
use syn::{parse_macro_input, ItemFn};

#[proc_macro_attribute]
pub fn logfn(_attr: TokenStream, item: TokenStream) -> TokenStream {
    // 解析用户输入的函数
    let input = parse_macro_input!(item as ItemFn);
    let fn_name = &input.sig.ident;
    let block = &input.block;
    let sig = &input.sig;
    let vis = &input.vis;

    let result = quote! {
        #vis #sig {
            println!(">>> Entering function: {}", stringify!(#fn_name));
            let result = (|| #block)();
            println!("<<< Leaving function: {}", stringify!(#fn_name));
            result
        }
    };

    result.into()
}
