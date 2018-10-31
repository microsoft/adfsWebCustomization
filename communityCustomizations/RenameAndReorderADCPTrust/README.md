# Rename & Reorder AD CP Trust In ADFS2016 Farm Level & Up

## Overview

This project contains an `ONLOAD.JS` script for renaming and reordering the Active Directory (AD) CP Trust. After raising the farm level to at least ADFS 2016, the order of the CP Trust list is updated whereas the AD CP trust is moved to the bottom and it does not inherit the display name of the federation service. It just shows "Active Directory". This piece of code, fixes the order of the CP trust list and it allows to to specify a custom display name for the AD CP trust.

## Applying The Customization

To change the name of the AD CP trust on the HRD page and put it back at the top again when the farm level is at least ADFS 2016, do the following: 

1. Add the code from the `ONLOAD.JS` to the `ONLOAD.JS` of your own ADFS farm

2. For more information and examples, please see: https://jorgequestforknowledge.wordpress.com/2018/10/09/changing-ad-cp-trust-display-name-and-order-in-adfs-2016/
