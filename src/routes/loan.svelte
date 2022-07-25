<script>
  let montlyInterest=1
  let loanTermMonths=12
  let loanPrincipal=1000
  let feesMonth=0

  $: monthlyPayment = getMontlyPayment(loanPrincipal, montlyInterest, loanTermMonths, feesMonth)
  $: yearlyInterest = ((((1+(montlyInterest/100))**12)-1)*100).toFixed(2)
  $: totalInterest = (((monthlyPayment*loanTermMonths)/loanPrincipal)*100).toFixed(2)

  function getMontlyPayment(loanPrincipal, montlyInterest, loanTermMonths, feesMonth){
    let interest = montlyInterest/100
    let payment = feesMonth+(loanPrincipal*(interest*((1+interest)**loanTermMonths)))/(((1+interest)**loanTermMonths)-1)

    return Math.floor(payment)
  }
</script>

<div class="flex flex-row justify-center mt-10">
  <div class="rounded-lg shadow border p-8 space-y-8">
    <div class="space-y-4">
      <div class="">
        <p class="font-bold">Montly Interest (%)</p>
        <input class="border rounded-lg p-1" type=number bind:value={montlyInterest} min=0>
      </div>
      <div class="">
        <p class="font-bold">Loan Term Months</p>
        <input class="border rounded-lg p-1" type=number bind:value={loanTermMonths} min=0>
      </div>
      <div class="">
        <p class="font-bold">Loan Principal</p>
        <input class="border rounded-lg p-1" type=number bind:value={loanPrincipal} min=0>
      </div>
      <div class="">
        <p class="font-bold">Montly Fees</p>
        <input class="border rounded-lg p-1" type=number bind:value={feesMonth} min=0>
      </div>
    </div>
    <div>
      <p class="text-center mb-2">Resoults:</p>
      <p><b>Yearly Interest:</b> {yearlyInterest}%</p>
      <p><b>Montly Payment:</b> {monthlyPayment}</p>
      <p><b>Total Payment:</b> {monthlyPayment*loanTermMonths}</p>
      <p><b>Total Interest:</b> {totalInterest}</p>
    </div>
  </div>
</div>
