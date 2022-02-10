import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../global.service';


@Component({
  selector: 'app-input-visitor-details',
  templateUrl: './input-visitor-details.component.html',
  styleUrls: ['./input-visitor-details.component.css']
})
export class InputVisitorDetailsComponent implements OnInit {
  region_data: Array<Object>
  states_data: Array<Object>
  cities_data: Array<Object>
  private sub: any
  city_id:String;
  province_id:String;
  ids = ''

  constructor(
    private fb: FormBuilder, 
    private svc:GlobalService, 
    private router: Router,
    private route: ActivatedRoute) { }
    private objForm = {
      cust_name: [''],
      pic: [''],
      region: [''],
      province: [''],
      city: [''],
      remark: [''],
      address: [''],
      address_nd: [''],
      contact: [''],
      kuota: ['']
    }

  profileForm = this.fb.group(this.objForm);

  ngOnInit(): void {
    this.getRegion();
    this.sub = this.route.params.subscribe(params => {
      this.ids = params['id'];
      this.svc.detailVisitor(params['id']).subscribe((resp) => {
        const data = resp.data
        this.objForm.cust_name = data.customer_name
        this.objForm.pic = data.pic
        this.objForm.remark = data.remark
        this.objForm.address = data.address_primary
        this.objForm.address_nd = data.address_secondary
        this.objForm.contact = data.contact_no
        this.objForm.kuota = data.kuota


        this.city_id = data.city._id
        this.province_id = data.province._id 
        this.svc.getProvinceId(this.province_id).subscribe((resp) => {
          this.states_data = resp.data.province
          this.objForm.province = resp.data.province
          this.profileForm = this.fb.group(this.objForm); 
        })
        this.svc.getCitiesId(this.city_id).subscribe((resp) => {
          this.cities_data = resp.data.cities
          this.objForm.city = resp.data.cities
          this.profileForm = this.fb.group(this.objForm); 
        })   
        this.profileForm = this.fb.group(this.objForm); 
       
      })
   });

  }

  ngAfterViewInit(){
    
  }
  
  getRegion() {
    this.svc.getRegion().subscribe((resp) => {
      this.region_data = resp.data.countries
    })
  }

  onSubmit(){
    const ids = this.ids
    const svc = this.svc
    if(ids == '' || typeof ids == 'undefined'){
      svc.submitVisitor(this.profileForm.value).subscribe((resp) => {
          alert(resp.message)
          this.router.navigate(['/']);
      })
    } else{
      const obj = {
        id: this.ids,
        ...this.profileForm.value
      }
      
      svc.updateVisitor(obj).subscribe((resp) => {
        alert(resp.message)
        this.router.navigate(['/']);
    })
    }
  }

  onChangeRegion(data){
    const valRegion = data.target.value;
    if(valRegion){
      this.svc.getProvince(valRegion).subscribe((resp) => {
          this.states_data = resp.data.states
      })
    }
  }

  abc(a,b){
    console.log(a,b)
  }
  
  onChangeProv(data){
    const valProv = data.target.value;
    if(valProv){
      this.svc.getCities(valProv).subscribe((resp) => {
          this.cities_data = resp.data.cities
      })
    }
  }

  changePage(path) {
    this.router.navigate(['/' + path]);
  }

}
